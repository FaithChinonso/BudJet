export function formatNumberWithCommas(number: string) {
  return `₦${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
export const customFilter = (data: any[], text: any | null) => {
  if (!text) return data;
  if (typeof text === "string") {
    return data?.filter((item: any) =>
      Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(text?.toLowerCase())
      )
    );
  }
  if (typeof text === "number") {
    return data?.filter((item: any) =>
      Object.keys(item).some((key) => item[key].includes(+text))
    );
  }
};
