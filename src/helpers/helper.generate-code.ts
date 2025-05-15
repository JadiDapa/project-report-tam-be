export function generateTicketCode(id: number, date = new Date()): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const paddedId = String(id).padStart(4, '0');

  return `TC-${day}-${month}-${year}-${paddedId}`;
}
