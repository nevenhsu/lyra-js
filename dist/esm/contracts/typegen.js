import { glob, runTypeChain } from 'typechain';
export default async function main() {
    const cwd = process.cwd();
    // find all files matching the glob
    const allFiles = glob(cwd, [`src/contracts/**/abis/+([a-zA-Z0-9_]).json`]);
    const deploymentFiles = allFiles.reduce((deployments, file) => {
        var _a;
        const deployment = file.split('/abis')[0];
        const deploymentFiles = (_a = deployments[deployment]) !== null && _a !== void 0 ? _a : [];
        return {
            ...deployments,
            [deployment]: deploymentFiles.concat(file),
        };
    }, {});
    await Promise.all(Object.entries(deploymentFiles).map(([deployment, files]) => {
        console.log({ files, deployment });
        runTypeChain({
            cwd,
            filesToProcess: files,
            allFiles: files,
            outDir: `${deployment}/typechain`,
            target: 'ethers-v5',
        });
    }));
}
main().catch(console.error);
//# sourceMappingURL=typegen.js.map