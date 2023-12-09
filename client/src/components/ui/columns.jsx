/* eslint-disable no-unused-vars */
import {
  customerStatuses,
  labels,
  orderStatuses,
  userLabels,
} from '../../data/table-data';
import SidebarDialog from '../shared/sidebar-dialog.componenet';
import UserPreview from '../user/user-preview.component';
import { Badge } from './badge';
import { Checkbox } from './checkbox';
import DataTableColumnHeader from './data-table-column-header';
import DataTableRowActions from './data-table-row-actions';

const getColumns = ({
  keyOne,
  keyTwo,
  keyThree,
  keyFour,
  keyFive,
  option,
  keyOneTitle,
  keyTwoTitle,
  keyThreeTitle,
  keyFourTitle,
  keyFiveTitle,
}) => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px]'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: keyOne,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={keyOneTitle}
          className={'!text-sm'}
        />
      ),
      cell: ({ row }) => {
        const { _id: id, account_type } = row.original;

        if (option === 'users' || option === 'customers') {
          return (
            <SidebarDialog id={id}>
              <UserPreview id={id} account_type={account_type} />
            </SidebarDialog>
          );
        }

        return (
          <Badge className='font-medium' variant={'outline'}>
            {row.getValue(keyOne)}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      // id: keyFive,
      accessorKey: keyTwo,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={keyTwoTitle} />
      ),
      cell: ({ row }) => {
        const cellValue = row.getValue(keyTwo);

        if (option === 'users' || option === 'customers') {
          return (
            <Badge variant='outline' className='font-medium'>
              {cellValue}
            </Badge>
          );
        } else if (option === 'orders') {
          return (
            <Badge variant='outline' className='font-medium'>
              {cellValue.email}
            </Badge>
          );
        }
      },

      enableSorting: false,
      enableHiding: false,
    },
    option === 'orders'
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const status = orderStatuses.find(
              (status) => status.value === row.getValue(keyThree)
            );

            if (!status) {
              return null;
            }

            return (
              <div className='flex w-[100px] items-center'>
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant='outline'
                  className={`font-medium ${status.badgeStyles}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
          enableSorting: false,
          enableHiding: false,
        }
      : option === 'customers'
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const label = labels.find(
              (label) => label.value === row.original.valid_account
            );
            return (
              <div className='flex space-x-2'>
                {label && (
                  <Badge
                    variant='outline'
                    className={`font-medium ${label.badgeStyles}`}
                  >
                    {label.label}
                  </Badge>
                )}
                <span className='max-w-[500px] truncate font-medium'>
                  {row.getValue(keyThree)}
                </span>
              </div>
            );
          },
        }
      : option === 'users'
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const label = userLabels.find(
              (label) => label.value === row.original.role
            );
            return (
              <div className='flex space-x-2'>
                {label && (
                  <Badge
                    variant='outline'
                    className={`font-medium ${label.badgeStyles}`}
                  >
                    {label.label}
                  </Badge>
                )}
              </div>
            );
          },
        }
      : null,
    option === 'orders'
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const dateValue = row.getValue(keyFour);
            const formattedValue = new Date(dateValue).toLocaleDateString();
            return (
              <Badge variant={'outline'} className={'font-medium'}>
                {formattedValue}
              </Badge>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === 'customers'
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyFour)
            );

            if (!status) {
              return null;
            }

            return (
              <div className='flex w-[100px] items-center'>
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant='outline'
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === 'users'
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyFour)
            );

            if (!status) {
              return null;
            }

            return (
              <div className='flex w-[100px] items-center'>
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant='outline'
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : null,
    {
      accessorKey: keyFive,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={keyFiveTitle} />
      ),
      cell: ({ row }) => {
        if (option === 'users' || option === 'customers') {
          const dateValue = row.getValue(keyFive);
          const formattedValue = new Date(dateValue).toLocaleDateString();
          return (
            <Badge variant={'outline'} className={'font-medium'}>
              {formattedValue}
            </Badge>
          );
        } else if (option === 'orders') {
          return <>{`$${row.getValue(keyFive)}`}</>;
        }

        return null;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        if (option === 'users' || option === 'customers') {
          return <DataTableRowActions option={option} row={row} />;
        }
      },
    },
  ];
};

export default getColumns;
