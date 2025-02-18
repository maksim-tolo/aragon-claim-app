import React from 'react';
import { useAragonApi } from '@aragon/api-react';
import { Text, DataView, Link } from '@aragon/ui';
import { formatCurrency } from '../../lib/web3-utils';

const PAGINATION = 10;
const DEFAULT_PROOF = 'Processing by cyber~Congress';

function ClaimHistoryTable({ style = {}, ...props }) {
  const { appState } = useAragonApi();
  const { userClaims } = appState;

  return (
    <div style={{ wordBreak: 'break-all', ...style }} {...props}>
      {userClaims && userClaims.length > 0 && (
        <DataView
          fields={[
            { label: 'ID', align: 'start' },
            { label: 'Amount', align: 'start' },
            { label: 'Date', align: 'start' },
            { label: 'CYBER Recipient', align: 'start' },
            { label: 'Proof TX', align: 'start' },
          ]}
          entries={userClaims.map(l => [
            l.vestingId,
            l.amount,
            l.start,
            l.account,
            l.proof,
          ])}
          renderEntry={([vestingId, amount, start, account, proof]) => [
            <Text style={{ minWidth: '60px' }}>{vestingId}</Text>,
            <Text style={{ minWidth: '60px' }}>{formatCurrency(amount)}</Text>,
            <Text>{start.toLocaleString()}</Text>,
            <Link
              style={{ whiteSpace: 'normal' }}
              href={`https://cyberd.ai/account/${account}`}
            >
              {account}
            </Link>,
            proof ? (
              <Link
                style={{ whiteSpace: 'normal' }}
                href={`https://cyberd.ai/transactions/${proof}`}
              >
                {proof}
              </Link>
            ) : (
              <Text>{DEFAULT_PROOF}</Text>
            ),
          ]}
          mode="table"
          entriesPerPage={PAGINATION}
        />
      )}
    </div>
  );
}

export default ClaimHistoryTable;
