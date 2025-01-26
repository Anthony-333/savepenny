const fs = require('fs');
const path = require('path');

const BANKS = [
  // Universal and Commercial Banks
  {
    name: 'bpi',
    displayName: 'Bank of the Philippine Islands',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#0066b3" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="100" text-anchor="middle">BPI</text>
    </svg>`
  },
  {
    name: 'bdo',
    displayName: 'Banco de Oro',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#006241" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="100" text-anchor="middle">BDO</text>
    </svg>`
  },
  {
    name: 'metrobank',
    displayName: 'Metropolitan Bank and Trust Company',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#0066b3" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="60" text-anchor="middle">METROBANK</text>
    </svg>`
  },
  {
    name: 'landbank',
    displayName: 'Land Bank of the Philippines',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#006837" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="80" text-anchor="middle">LANDBANK</text>
    </svg>`
  },
  {
    name: 'pnb',
    displayName: 'Philippine National Bank',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#ff6319" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="100" text-anchor="middle">PNB</text>
    </svg>`
  },
  {
    name: 'securitybank',
    displayName: 'Security Bank',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#006241" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="60" text-anchor="middle">SECURITY BANK</text>
    </svg>`
  },
  {
    name: 'unionbank',
    displayName: 'UnionBank of the Philippines',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#004a8f" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="60" text-anchor="middle">UNIONBANK</text>
    </svg>`
  },
  {
    name: 'rcbc',
    displayName: 'Rizal Commercial Banking Corporation',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#00529b" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="100" text-anchor="middle">RCBC</text>
    </svg>`
  },
  {
    name: 'chinabank',
    displayName: 'China Banking Corporation',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#ed1c24" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="60" text-anchor="middle">CHINA BANK</text>
    </svg>`
  },
  {
    name: 'eastwest',
    displayName: 'EastWest Bank',
    category: 'Universal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#00adee" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="60" text-anchor="middle">EAST WEST</text>
    </svg>`
  }
];

const DIGITAL_BANKS = [
  {
    name: 'gcash',
    displayName: 'GCash',
    category: 'E-wallet',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#00adef" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="100" text-anchor="middle">GCash</text>
    </svg>`
  },
  {
    name: 'maya',
    displayName: 'Maya',
    category: 'Digital Bank',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#6437A0" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="100" text-anchor="middle">Maya</text>
    </svg>`
  },
  {
    name: 'tonik',
    displayName: 'Tonik Digital Bank',
    category: 'Digital Bank',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#FF2E5F" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="80" text-anchor="middle">TONIK</text>
    </svg>`
  },
  {
    name: 'unobank',
    displayName: 'UNO Digital Bank',
    category: 'Digital Bank',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#00B9FF" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="80" text-anchor="middle">UNO</text>
    </svg>`
  },
  {
    name: 'seabank',
    displayName: 'SeaBank',
    category: 'Digital Bank',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#00B14F" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="80" text-anchor="middle">SeaBank</text>
    </svg>`
  },
  {
    name: 'grabpay',
    displayName: 'GrabPay',
    category: 'E-wallet',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#00B14F" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="80" text-anchor="middle">GrabPay</text>
    </svg>`
  },
  {
    name: 'shopeepay',
    displayName: 'ShopeePay',
    category: 'E-wallet',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
      <path fill="#EE4D2D" d="M150 50h500v200H150z"/>
      <text x="400" y="180" fill="white" font-family="Arial" font-size="70" text-anchor="middle">ShopeePay</text>
    </svg>`
  }
];

const main = async () => {
  // Create directories if they don't exist
  const baseDir = path.join(__dirname, '../assets/image/bank-logo');
  const traditionalDir = path.join(baseDir, 'traditional');
  const digitalDir = path.join(baseDir, 'digital');

  [traditionalDir, digitalDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Save traditional bank logos
  console.log('Creating traditional bank logos...');
  for (const bank of BANKS) {
    const filename = path.join(traditionalDir, `${bank.name}.svg`);
    try {
      fs.writeFileSync(filename, bank.svg);
      console.log(`Created ${bank.displayName} logo`);
    } catch (err) {
      console.error(`Error creating ${bank.displayName} logo:`, err);
    }
  }

  // Save digital bank logos
  console.log('\nCreating digital bank logos...');
  for (const bank of DIGITAL_BANKS) {
    const filename = path.join(digitalDir, `${bank.name}.svg`);
    try {
      fs.writeFileSync(filename, bank.svg);
      console.log(`Created ${bank.displayName} logo`);
    } catch (err) {
      console.error(`Error creating ${bank.displayName} logo:`, err);
    }
  }

  // Create an index file with bank information
  const indexContent = {
    traditional: BANKS.map(bank => ({
      name: bank.name,
      displayName: bank.displayName,
      category: bank.category,
      logo: `traditional/${bank.name}.svg`
    })),
    digital: DIGITAL_BANKS.map(bank => ({
      name: bank.name,
      displayName: bank.displayName,
      category: bank.category,
      logo: `digital/${bank.name}.svg`
    }))
  };

  fs.writeFileSync(
    path.join(baseDir, 'index.json'),
    JSON.stringify(indexContent, null, 2)
  );
  console.log('\nCreated index.json with bank information');
};

main().catch(console.error); 