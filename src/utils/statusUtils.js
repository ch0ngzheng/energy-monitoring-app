/**
 * Determines the energy consumption status based on given value and thresholds
 * @param {number} value - The consumption value
 * @param {number} optimalThreshold - Upper limit for optimal status (inclusive)
 * @param {number} subOptimalThreshold - Upper limit for sub-optimal status (inclusive)
 * @returns {string} - Status: 'Optimal', 'Sub-optimal', or 'Critical'
 */
export const determineEnergyStatus = (value, optimalThreshold, subOptimalThreshold) => {
    if (value <= optimalThreshold) {
      return 'Optimal';
    } else if (value <= subOptimalThreshold) {
      return 'Sub-optimal';
    } else {
      return 'Critical';
    }
  };
  
  /**
   * Formats a date to a relative time string (e.g., "2 hours ago")
   * @param {Date|string|number} date - The date to format
   * @returns {string} - Formatted relative time
   */
  export const formatRelativeTime = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    const diffInSeconds = Math.floor((now - inputDate) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  };
  
  /**
   * Formats a number to include commas for thousands
   * @param {number} number - The number to format
   * @returns {string} - Formatted number with commas
   */
  export const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  /**
   * Formats a number as currency
   * @param {number} amount - The amount to format
   * @param {string} currency - Currency code (default: USD)
   * @returns {string} - Formatted currency
   */
  export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };
  
  /**
   * Formats a kWh value with correct unit
   * @param {number} value - The energy value in kWh
   * @returns {string} - Formatted energy value with unit
   */
  export const formatEnergy = (value) => {
    return `${Number(value).toFixed(1)} kWh`;
  };