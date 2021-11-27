const { execSync } = require('child_process');

const oldVer = JSON.parse(execSync('git show HEAD~1:package.json')).version;
const newVer = JSON.parse(execSync('git show HEAD:package.json')).version;

if (oldVer !== newVer) {
	execSync(`git tag ${newVer}`);
}
