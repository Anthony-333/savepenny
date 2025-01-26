export const getBankLogo = (bankName: string) => {
  try {
    return bankName === 'bpi' ? require('@/assets/image/bank-logo/traditional/bpi.svg') :
           bankName === 'bdo' ? require('@/assets/image/bank-logo/traditional/bdo.svg') :
           bankName === 'metrobank' ? require('@/assets/image/bank-logo/traditional/metrobank.svg') :
           bankName === 'landbank' ? require('@/assets/image/bank-logo/traditional/landbank.svg') :
           bankName === 'pnb' ? require('@/assets/image/bank-logo/traditional/pnb.svg') :
           bankName === 'securitybank' ? require('@/assets/image/bank-logo/traditional/securitybank.svg') :
           bankName === 'unionbank' ? require('@/assets/image/bank-logo/traditional/unionbank.svg') :
           bankName === 'rcbc' ? require('@/assets/image/bank-logo/traditional/rcbc.svg') :
           bankName === 'chinabank' ? require('@/assets/image/bank-logo/traditional/chinabank.svg') :
           bankName === 'eastwest' ? require('@/assets/image/bank-logo/traditional/eastwest.svg') :
           bankName === 'gcash' ? require('@/assets/image/bank-logo/digital/gcash.svg') :
           bankName === 'maya' ? require('@/assets/image/bank-logo/digital/maya.svg') :
           bankName === 'tonik' ? require('@/assets/image/bank-logo/digital/tonik.svg') :
           bankName === 'unobank' ? require('@/assets/image/bank-logo/digital/unobank.svg') :
           bankName === 'seabank' ? require('@/assets/image/bank-logo/digital/seabank.svg') :
           bankName === 'grabpay' ? require('@/assets/image/bank-logo/digital/grabpay.svg') :
           bankName === 'shopeepay' ? require('@/assets/image/bank-logo/digital/shopeepay.svg') :
           null;
  } catch {
    return null;
  }
}; 