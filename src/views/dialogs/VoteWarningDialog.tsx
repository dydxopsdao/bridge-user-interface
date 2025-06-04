import styled, { AnyStyledComponent } from 'styled-components';
import { useDispatch } from 'react-redux';
import { Close } from '@radix-ui/react-dialog';

import { ButtonAction } from '@/constants/buttons';
import { DialogProps } from '@/constants/dialogs';
import { LocalStorageKey } from '@/constants/localStorage';

import { layoutMixins } from '@/styles/layoutMixins';

import { setLocalStorage } from '@/lib/localStorage';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { Icon, IconName } from '@/components/Icon';

import { closeDialog } from '@/state/dialogs';

export const VoteWarningDialog = ({ setIsOpen }: DialogProps) => {
  const dispatch = useDispatch();

  const onContinue = () => {
    // Mark as dismissed for the current session (until browser is closed/refreshed)
    sessionStorage.setItem(LocalStorageKey.VoteWarningDismissed, 'true');
    dispatch(closeDialog());
  };

  return (
    <Dialog 
      isOpen 
      setIsOpen={setIsOpen} 
      title="Bridge Deprecation Notice"
      slotIcon={<Styled.Icon iconName={IconName.Warning} />}
      preventClose={false}
    >
      <Styled.Content>
        <p>
        A dYdX Chain governance <a href="https://www.mintscan.io/dydx/proposals/251/" target="_blank">proposal</a> has been initiated to terminate support for the ethDYDX–dYdX Chain bridge. If approved, the ability to migrate Ethereum-based DYDX tokens will cease.<br />
        <br />
        If the proposal is passed, validators are expected to stop acknowledging bridge transactions on 12 June 2025. Users are therefore strongly encouraged to complete any pending migration of Ethereum-based DYDX tokens to the dYdX Chain prior to this date.<br />
        <br />
        This notice is provided for general informational purposes only and does not constitute legal, financial, or technical advice. The dYdX Operations subDAO does not accept any responsibility or liability for transaction failures, delays, or reliance on this communication. For further details, including the governance proposal and supporting discussions, please consult the <a href="https://dydx.forum/" target="_blank">dYdX Governance Forum</a>, which is independent and unaffiliated with the dYdX Operations subDAO.
        </p>
        <Styled.ButtonRow>
          <Close asChild>
            <Button action={ButtonAction.Primary} onClick={onContinue}>
              Continue
            </Button>
          </Close>
        </Styled.ButtonRow>
      </Styled.Content>
    </Dialog>
  );
};

const Styled: Record<string, AnyStyledComponent> = {};

Styled.Content = styled.div`
  ${layoutMixins.flexColumn}
  gap: 1.5rem;
  padding: 1.5rem;

  p {
    margin: 0;
    color: var(--color-text-1);
    font: var(--font-base-book);
    line-height: 1.5;
  }
`;

Styled.ButtonRow = styled.div`
  ${layoutMixins.row}
  gap: 1rem;
  justify-content: center;
`;

Styled.Icon = styled(Icon)`
  color: var(--color-warning);
  font-size: 2rem;
`; 