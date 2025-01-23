import AllGroupTabs from '../_components/AllGroupTabs';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <div className='text-base font-normal mb-9'>
        <Link href={'/workspace-list/mygroup'}>
          <span className='mr-9 text-slate-200'>my group</span>
        </Link>
        <span>all group</span>
      </div>
      <AllGroupTabs />
    </div>
  );
}
