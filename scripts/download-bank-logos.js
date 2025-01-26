const fs = require('fs');
const https = require('https');
const path = require('path');

const BANKS = [
  {
    name: 'bpi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/BPI_2021.svg',
    displayName: 'Bank of the Philippine Islands'
  },
  {
    name: 'bdo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/BDO_Unibank_%28logo%29.svg',
    displayName: 'Banco de Oro'
  },
  {
    name: 'metrobank',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Metrobank.svg',
    displayName: 'Metropolitan Bank and Trust Company'
  },
  {
    name: 'unionbank',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Unionbank_logo.svg',
    displayName: 'UnionBank of the Philippines'
  },
  {
    name: 'rcbc',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/RCBC_2022_logo.svg',
    displayName: 'Rizal Commercial Banking Corporation'
  },
  {
    name: 'securitybank',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Security_Bank_Corporation.svg',
    displayName: 'Security Bank'
  },
  {
    name: 'eastwest',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/EastWest_Bank.svg',
    displayName: 'EastWest Bank'
  }
];

const DIGITAL_BANKS = [
  {
    name: 'gcash',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/GCash_Logo_2019.svg',
    displayName: 'GCash'
  },
  {
    name: 'maya',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Maya_logo.svg',
    displayName: 'Maya'
  },
  {
    name: 'tonik',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Tonik_Digital_Bank.svg',
    displayName: 'Tonik Digital Bank'
  },
  {
    name: 'unobank',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/UNO_Digital_Bank.svg',
    displayName: 'UNO Digital Bank'
  }
];

const downloadSvg = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filename);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}`);
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

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

  // Download traditional bank logos
  console.log('Downloading traditional bank logos...');
  for (const bank of BANKS) {
    const filename = path.join(traditionalDir, `${bank.name}.svg`);
    try {
      await downloadSvg(bank.url, filename);
      console.log(`Downloaded ${bank.displayName} logo`);
    } catch (err) {
      console.error(`Error downloading ${bank.displayName} logo:`, err);
    }
  }

  // Download digital bank logos
  console.log('\nDownloading digital bank logos...');
  for (const bank of DIGITAL_BANKS) {
    const filename = path.join(digitalDir, `${bank.name}.svg`);
    try {
      await downloadSvg(bank.url, filename);
      console.log(`Downloaded ${bank.displayName} logo`);
    } catch (err) {
      console.error(`Error downloading ${bank.displayName} logo:`, err);
    }
  }

  // Create an index file with bank information
  const indexContent = {
    traditional: BANKS.map(bank => ({
      name: bank.name,
      displayName: bank.displayName,
      logo: `traditional/${bank.name}.svg`
    })),
    digital: DIGITAL_BANKS.map(bank => ({
      name: bank.name,
      displayName: bank.displayName,
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