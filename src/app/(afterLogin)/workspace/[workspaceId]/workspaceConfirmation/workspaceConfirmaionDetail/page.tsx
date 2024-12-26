'use client';

import { Dialog } from '@/components/ui/dialog';

import { useSearchParams } from 'next/navigation';

import ScrollTop from '../_components/ScrollTop';
import ConfirmationObjectionCompo from './_components/confirmationObjection/ConfirmationObjectionCompo';
import ConfirmationDetailCompo from './_components/ConfirmationDetailCompo';
import ConfirmationDetailObjectionInput from './_components/ConfirmationDetailObjectionInput';

export default function Page() {
  const seachParams = useSearchParams();
  const workoutConfirmationId = parseInt(
    seachParams.get('workoutConfirmationId') || '0',
    10
  );

  return (
    <div className='h-screen'>
      <ScrollTop />
      <ConfirmationDetailCompo workoutConfirmationId={workoutConfirmationId} />

      {/* 이의 신청 팝업창 */}
      <Dialog>
        <ConfirmationObjectionCompo seachParams={seachParams} />

        <ConfirmationDetailObjectionInput
          workoutConfirmationId={workoutConfirmationId}
        />
      </Dialog>
    </div>
  );
}
