import { ColumnDef } from '@tanstack/react-table';
import { TenantResource, TenantResourceLimit } from '@/lib/api';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from '@/next/components/runs/runs-table/data-table-column-header';
import { Time } from '@/next/components/ui/time';

const resources: Record<TenantResource, string> = {
  [TenantResource.WORKER]: 'Total Workers',
  [TenantResource.WORKER_SLOT]: 'Concurrency Limit',
  [TenantResource.EVENT]: 'Events',
  [TenantResource.WORKFLOW_RUN]: 'Workflow Runs',
  [TenantResource.TASK_RUN]: 'Task Runs',
  [TenantResource.CRON]: 'Cron Triggers',
  [TenantResource.SCHEDULE]: 'Schedule Triggers',
};

const indicatorVariants = {
  ok: 'border-transparent rounded-full bg-green-500',
  alarm: 'border-transparent rounded-full bg-yellow-500',
  exhausted: 'border-transparent rounded-full bg-red-500',
};

function LimitIndicator({
  value,
  alarmValue,
  limitValue,
}: {
  value: number;
  alarmValue?: number;
  limitValue: number;
}) {
  let variant = indicatorVariants.ok;

  if (alarmValue && value >= alarmValue) {
    variant = indicatorVariants.alarm;
  }

  if (value >= limitValue) {
    variant = indicatorVariants.exhausted;
  }

  return <div className={cn(variant, 'rounded-full h-[6px] w-[6px]')} />;
}

const durationMap: Record<string, string> = {
  '24h0m0s': 'Daily',
  '168h0m0s': 'Weekly',
  '720h0m0s': 'Monthly',
};

export const columns = (): ColumnDef<TenantResourceLimit>[] => {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resource" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-row items-center gap-4 pl-4">
          <LimitIndicator
            value={row.original.value}
            alarmValue={row.original.alarmValue}
            limitValue={row.original.limitValue}
          />
          {resources[row.original.resource]}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'current',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Current Value" />
      ),
      cell: ({ row }) => <div>{row.original.value.toLocaleString()}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'limit_value',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Limit Value" />
      ),
      cell: ({ row }) => <div>{row.original.limitValue.toLocaleString()}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'alarm_value',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Alarm Value" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.alarmValue
            ? row.original.alarmValue.toLocaleString()
            : 'N/A'}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'window',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Meter Window" />
      ),
      cell: ({ row }) => (
        <div>
          {(row.original.window || '-') in durationMap
            ? durationMap[row.original.window || '-']
            : row.original.window}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'alarm_value',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Refill" />
      ),
      cell: ({ row }) => (
        <div>
          {!row.original.window
            ? 'N/A'
            : row.original.lastRefill && (
                <Time date={row.original.lastRefill} />
              )}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
