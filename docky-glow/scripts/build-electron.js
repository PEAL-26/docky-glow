import * as es from 'esbuild';
import * as fs from 'fs';
import * as url from 'node:url'
import * as path from 'node:path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = __dirname.replace(/[\\/]scripts$/, '');

const buildElectron = async () => {
  const outDir = path.join(rootDir, 'dist-electron');
  
  // Remover a pasta caso exista, para recriar todos arquivos de novo
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  
  // Criar diretório de saída se não existir
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }


  try {
    // Compilar main.ts
    await es.build({
      entryPoints: [path.join(rootDir, 'electron/main.ts')],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: path.join(outDir, 'main.cjs'),
      external: ['electron'],
      format: 'cjs',
      sourcemap: true,
    });

    // Compilar preload.ts
    await es.build({
      entryPoints: [path.join(rootDir, 'electron/preload.ts')],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: path.join(outDir, 'preload.cjs'),
      external: ['electron'],
      format: 'cjs',
      sourcemap: true,
    });

    console.log('✅ Electron compilado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao compilar Electron:', error);
    process.exit(1);
  }
};

buildElectron();

