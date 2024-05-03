/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { AtSign, Loader2, Mail, PenSquare } from 'lucide-react';

import { useGetUserByIdQuery } from '../../app/api/users.api';
import { useGetCustomerByIdQuery } from '../../app/api/customers.api';
import { customerStatuses, userLabels } from '../../data/table-data';

import { isAccountTypeUser } from '../../helpers/isAccountTypeUser';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { dateFormatter } from '../../helpers/dateFormatter';

const UserPreview = ({ id, account_type }) => {
  const [data, setData] = useState({});

  const isUser = isAccountTypeUser(account_type);
  const userId = isUser ? id : null;
  const customerId = !isUser ? id : null;

  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(userId, {
    skip: !isUser,
  });
  const { data: customer, isLoading: isLoadingCustomer } =
    useGetCustomerByIdQuery(customerId, { skip: isUser });

  const isLoading = isLoadingUser || isLoadingCustomer;

  useEffect(() => {
    isUser ? setData(user) : setData(customer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const label =
    isUser && data
      ? userLabels.find((label) => label.value === data?.role)
      : null;

  const account_status = data
    ? customerStatuses.find((status) => status.value === data?.active)
    : null;

  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    data && (
      <div>
        <h2 className='font-semibold text-xl text-center mb-4 underline'>
          User Details:
        </h2>
        <div className='mb-4 flex flex-col gap-4 justify-center items-center'>
          <Avatar className='w-20 h-20 shadow-2xl'>
            <AvatarImage src={data.profile_image} alt={data.username} />
            <AvatarFallback>{data.username}</AvatarFallback>
          </Avatar>

          <div className='flex flex-col items-center gap-4'>
            <h2 className='font-bold text-lg'>
              {data.first_name} {data.last_name}
            </h2>

            <div className='flex items-center gap-2'>
              <p className='text-sm font-semibold underline'>Username:</p>
              <p className='flex items-center text-sm gap-1 no-underline'>
                <AtSign size={12} /> {data.username}
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <p className='text-sm underline font-semibold'>Account Status:</p>
              {account_status && (
                <Badge
                  variant='outline'
                  className={`font-medium ${account_status?.badgeColor}`}
                >
                  {account_status?.icon && (
                    <account_status.icon
                      className={`mr-2 h-4 w-4 ${account_status?.color}`}
                    />
                  )}
                  {account_status.label}
                </Badge>
              )}
            </div>

            <div className='flex items-center gap-2'>
              <p className='underline text-sm font-semibold'>E-mail:</p>
              <p className='flex items-center gap-2 text-sm'>
                <Mail size={14} />
                {data.email}
              </p>
            </div>

            {isUser && (
              <div className='flex items-center space-x-2'>
                <p className='text-sm font-semibold underline'>Role:</p>
                {label && (
                  <Badge
                    variant='outline'
                    className={`flex items-center gap-2 font-medium h-6 ${label.badgeStyles}`}
                  >
                    <PenSquare size={12} />
                    {label.label}
                  </Badge>
                )}
              </div>
            )}

            <div className='flex items-center gap-2'>
              <p className='flex items-center gap-2 text-sm font-semibold underline'>
                Last Login:
              </p>
              <p className='text-sm'>{dateFormatter(data.creation_date)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserPreview;
