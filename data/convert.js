const fs = require('fs');

const lines = fs.readFileSync('cookies.txt', 'utf8').split('\n');

const cookies = [];

for (let line of lines) {
  if (line.trim() === '' || line.startsWith('#')) continue;
  
  const parts = line.split('\t');
  if (parts.length < 7) continue;
  
  cookies.push({
    domain: parts[0],
    flag: parts[1] === 'TRUE',
    path: parts[2],
    secure: parts[3] === 'TRUE',
    expiration: parseInt(parts[4]),
    name: parts[5],
    value: parts[6].trim()
  });
}

fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
console.log('Convertido com sucesso! cookies.json criado.');