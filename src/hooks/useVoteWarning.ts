import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DialogTypes } from '@/constants/dialogs';
import { LocalStorageKey } from '@/constants/localStorage';

import { openDialog } from '@/state/dialogs';

export const useVoteWarning = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the warning has already been dismissed in this session
    const warningDismissed = sessionStorage.getItem(LocalStorageKey.VoteWarningDismissed);
    
    if (!warningDismissed) {
      // Add a small delay to ensure this comes after other immediate dialogs (like AcknowledgeTerms)
      // This prevents race conditions during initial page load
      const timer = setTimeout(() => {
        dispatch(
          openDialog({
            type: DialogTypes.VoteWarning,
            openImmediately: true,
          })
        );
      }, 100); // 100ms delay

      return () => clearTimeout(timer);
    }
  }, [dispatch]);
}; 