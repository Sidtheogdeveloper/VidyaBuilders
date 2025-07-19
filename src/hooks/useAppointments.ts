import { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';
import { Appointment } from '../types';

export const useAppointments = (userId?: string) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadAppointments();
    }
  }, [userId]);

  const loadAppointments = async () => {
    if (!userId) return;
    
    try {
      setError(null);
      setLoading(true);
      const userAppointments = await appointmentService.getUserAppointments(userId);
      setAppointments(userAppointments);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: Omit<Appointment, 'id'>) => {
    try {
      setError(null);
      const appointmentId = await appointmentService.createAppointment({
        ...appointmentData,
        userId: userId!
      });
      
      // Reload appointments to get the updated list
      await loadAppointments();
      return appointmentId;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateAppointment = async (appointmentId: string, updates: Partial<Appointment>) => {
    try {
      setError(null);
      await appointmentService.updateAppointment(appointmentId, updates);
      await loadAppointments();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      setError(null);
      await appointmentService.cancelAppointment(appointmentId);
      await loadAppointments();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    refreshAppointments: loadAppointments
  };
};