export const ErrorMessage = ({ msg }: { msg: string | undefined | null }) =>
  msg ? (
    <span className="mt-1 inline-block text-sm text-red-500">{msg}</span>
  ) : null;
