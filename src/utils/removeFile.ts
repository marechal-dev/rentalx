import fs from "node:fs/promises";

async function deleteFile(fileName: string): Promise<void> {
	try {
		await fs.stat(fileName);
	} catch (error) {
		return;
	}

	await fs.unlink(fileName);
}

export { deleteFile };
