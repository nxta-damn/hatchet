import { Snippet } from '@/next/lib/docs/generated/snips/types';

const snippet: Snippet = {
  language: 'typescript ',
  content:
    "import { nonRetryableWorkflow } from './workflow';\n\nasync function main() {\n  const res = await nonRetryableWorkflow.runNoWait({});\n\n  console.log(res);\n}\n\nif (require.main === module) {\n  main();\n}\n",
  source: 'out/typescript/non_retryable/run.ts',
  blocks: {},
  highlights: {},
};

export default snippet;
