import { Snippet } from '@/next/lib/docs/generated/snips/types';

const snippet: Snippet = {
  language: 'python',
  content:
    'from examples.lifespans.worker import lifespan_workflow\n\nresult = lifespan_workflow.run()\n\nprint(result)\n',
  source: 'out/python/lifespans/trigger.py',
  blocks: {},
  highlights: {},
};

export default snippet;
