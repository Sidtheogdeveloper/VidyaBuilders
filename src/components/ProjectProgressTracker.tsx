import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, Camera, TrendingUp, Home } from 'lucide-react';
import { OwnedUnit, ProjectMilestone } from '../types';
import { progressService } from '../services/progressService';

interface ProjectProgressTrackerProps {
  userId: string;
}

const ProjectProgressTracker: React.FC<ProjectProgressTrackerProps> = ({ userId }) => {
  const [ownedUnits, setOwnedUnits] = useState<OwnedUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<OwnedUnit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOwnedUnits();
  }, [userId]);

  const loadOwnedUnits = async () => {
    try {
      const units = await progressService.getUserOwnedUnits(userId);
      setOwnedUnits(units);
      if (units.length > 0) {
        setSelectedUnit(units[0]);
      }
    } catch (error) {
      console.error('Error loading owned units:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? 'text-green-600' : 'text-gray-400';
  };

  const getStatusBg = (isCompleted: boolean) => {
    return isCompleted ? 'bg-green-100' : 'bg-gray-100';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (ownedUnits.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <Home size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Owned Units</h3>
        <p className="text-gray-600 mb-4">
          You don't have any units in our projects yet. Explore our current projects to find your dream home!
        </p>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors">
          Browse Projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Unit Selection */}
      {ownedUnits.length > 1 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Units</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {ownedUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedUnit?.id === unit.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{unit.projectName}</div>
                <div className="text-sm text-gray-600">
                  {unit.unitType} - Unit {unit.unitNumber}
                </div>
                <div className="text-sm text-amber-600 mt-1">
                  {unit.currentProgress}% Complete
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedUnit && (
        <>
          {/* Unit Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedUnit.projectName}</h2>
                <p className="text-gray-600">
                  {selectedUnit.unitType} - Unit {selectedUnit.unitNumber}, Floor {selectedUnit.floorNumber}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-600">{selectedUnit.currentProgress}%</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar size={20} className="text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Purchase Date</div>
                  <div className="font-medium">
                    {new Date(selectedUnit.purchaseDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Expected Completion</div>
                  <div className="font-medium">
                    {new Date(selectedUnit.expectedCompletion).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <TrendingUp size={20} className="text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Progress Status</div>
                  <div className="font-medium text-green-600">On Track</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>Overall Progress</span>
                <span>{selectedUnit.currentProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${selectedUnit.currentProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Construction Milestones</h3>
            
            <div className="space-y-6">
              {selectedUnit.milestones
                .sort((a, b) => a.order - b.order)
                .map((milestone, index) => (
                <div key={milestone.id} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusBg(milestone.isCompleted)}`}>
                    {milestone.isCompleted ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${milestone.isCompleted ? 'text-gray-900' : 'text-gray-600'}`}>
                        {milestone.title}
                      </h4>
                      {milestone.completedDate && (
                        <span className="text-sm text-gray-500">
                          {new Date(milestone.completedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-3 ${milestone.isCompleted ? 'text-gray-700' : 'text-gray-500'}`}>
                      {milestone.description}
                    </p>
                    
                    {milestone.images && milestone.images.length > 0 && (
                      <div className="flex space-x-2">
                        {milestone.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <img
                              src={image}
                              alt={`${milestone.title} progress`}
                              className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                              <Camera size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {index < selectedUnit.milestones.length - 1 && (
                    <div className="absolute left-5 mt-10 w-0.5 h-6 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <div className="text-blue-800">
              {selectedUnit.currentProgress < 100 ? (
                <p>
                  The next milestone is <strong>Interior Finishing</strong>, expected to complete by the end of this quarter. 
                  We'll notify you with updates and photos as work progresses.
                </p>
              ) : (
                <p>
                  Congratulations! Your unit is ready for handover. Our team will contact you soon to schedule 
                  the final inspection and key handover ceremony.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectProgressTracker;