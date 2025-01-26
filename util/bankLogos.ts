// Traditional Banks
import bpiLogo from '@/assets/image/bank-logo/traditional/bpi.svg';
import bdoLogo from '@/assets/image/bank-logo/traditional/bdo.svg';
import metrobankLogo from '@/assets/image/bank-logo/traditional/metrobank.svg';
import landbankLogo from '@/assets/image/bank-logo/traditional/landbank.svg';
import pnbLogo from '@/assets/image/bank-logo/traditional/pnb.svg';
import securitybankLogo from '@/assets/image/bank-logo/traditional/securitybank.svg';
import unionbankLogo from '@/assets/image/bank-logo/traditional/unionbank.svg';
import rcbcLogo from '@/assets/image/bank-logo/traditional/rcbc.svg';
import chinabankLogo from '@/assets/image/bank-logo/traditional/chinabank.svg';
import eastwestLogo from '@/assets/image/bank-logo/traditional/eastwest.svg';

// Digital Banks and E-wallets
import gcashLogo from '@/assets/image/bank-logo/digital/gcash.svg';
import mayaLogo from '@/assets/image/bank-logo/digital/maya.svg';
import tonikLogo from '@/assets/image/bank-logo/digital/tonik.svg';
import unobankLogo from '@/assets/image/bank-logo/digital/unobank.svg';
import seabankLogo from '@/assets/image/bank-logo/digital/seabank.svg';
import grabpayLogo from '@/assets/image/bank-logo/digital/grabpay.svg';
import shopeepayLogo from '@/assets/image/bank-logo/digital/shopeepay.svg';

const bankLogos: { [key: string]: any } = {
  // Traditional Banks
  bpi: bpiLogo,
  bdo: bdoLogo,
  metrobank: metrobankLogo,
  landbank: landbankLogo,
  pnb: pnbLogo,
  securitybank: securitybankLogo,
  unionbank: unionbankLogo,
  rcbc: rcbcLogo,
  chinabank: chinabankLogo,
  eastwest: eastwestLogo,

  // Digital Banks and E-wallets
  gcash: gcashLogo,
  maya: mayaLogo,
  tonik: tonikLogo,
  unobank: unobankLogo,
  seabank: seabankLogo,
  grabpay: grabpayLogo,
  shopeepay: shopeepayLogo,
};

export const getBankLogo = (bankId: string) => {
  return bankLogos[bankId] || null;
}; 