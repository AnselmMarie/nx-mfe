import { formatDateUtil } from '@nx-mfe/rslib-none';
import { template } from '@nx-mfe/testing-one';
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
  return (
    <>
      <div>Template: {template()}</div>
      <div>Date: {formatDateUtil()}</div>
    </>
  );
}

export default NxWelcome;
