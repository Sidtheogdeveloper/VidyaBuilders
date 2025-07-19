import { EMICalculation } from '../types';

export const calculateEMI = (
  loanAmount: number,
  annualInterestRate: number,
  tenureInYears: number
): EMICalculation => {
  // Convert annual rate to monthly and percentage to decimal
  const monthlyRate = (annualInterestRate / 100) / 12;
  const numberOfPayments = tenureInYears * 12;

  // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalAmount = emi * numberOfPayments;
  const totalInterest = totalAmount - loanAmount;

  return {
    loanAmount,
    interestRate: annualInterestRate,
    tenure: tenureInYears,
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest)
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};