import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, PieChart, Info } from 'lucide-react';
import { calculateEMI, formatCurrency, formatNumber } from '../utils/emiCalculator';
import { EMICalculation } from '../types';

interface EMICalculatorProps {
  defaultLoanAmount?: number;
  onClose?: () => void;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ defaultLoanAmount = 5000000, onClose }) => {
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(20);
  const [calculation, setCalculation] = useState<EMICalculation | null>(null);

  useEffect(() => {
    const result = calculateEMI(loanAmount, interestRate, tenure);
    setCalculation(result);
  }, [loanAmount, interestRate, tenure]);

  const handleLoanAmountChange = (value: string) => {
    const amount = parseInt(value.replace(/,/g, '')) || 0;
    setLoanAmount(amount);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calculator size={24} className="text-amber-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">EMI Calculator</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="text"
                value={formatNumber(loanAmount)}
                onChange={(e) => handleLoanAmountChange(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹10L</span>
              <span>₹5Cr</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              step="0.1"
              min="1"
              max="20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              type="range"
              min="6"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6%</span>
              <span>15%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value) || 0)}
              min="1"
              max="30"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5 years</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {calculation && (
            <>
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-sm text-amber-700 mb-2">Monthly EMI</div>
                  <div className="text-3xl font-bold text-amber-800">
                    {formatCurrency(calculation.emi)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <TrendingUp size={20} className="text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-blue-700 mb-1">Total Amount</div>
                  <div className="text-lg font-bold text-blue-800">
                    {formatCurrency(calculation.totalAmount)}
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <PieChart size={20} className="text-red-600 mx-auto mb-2" />
                  <div className="text-sm text-red-700 mb-1">Total Interest</div>
                  <div className="text-lg font-bold text-red-800">
                    {formatCurrency(calculation.totalInterest)}
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-medium">{formatCurrency(calculation.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Amount:</span>
                    <span className="font-medium">{formatCurrency(calculation.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900 font-semibold">Total Payable:</span>
                    <span className="font-bold">{formatCurrency(calculation.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Principal vs Interest</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-green-500 h-4 rounded-l-full"
                    style={{ 
                      width: `${(calculation.loanAmount / calculation.totalAmount) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">
                    Principal: {((calculation.loanAmount / calculation.totalAmount) * 100).toFixed(1)}%
                  </span>
                  <span className="text-red-600">
                    Interest: {((calculation.totalInterest / calculation.totalAmount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <Info size={20} className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">EMI Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep your EMI below 40% of your monthly income</li>
              <li>• Compare interest rates from multiple lenders</li>
              <li>• Consider making prepayments to reduce interest burden</li>
              <li>• Factor in processing fees and other charges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;