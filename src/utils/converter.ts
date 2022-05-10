import { SystemEdptType } from '@/types/SystemType';

export const stringArrToEdptArr = (arr: string[]) => {
  const edpts: SystemEdptType[] = [];
  arr.forEach((edpt) => {
    const afterStr = edpt.split(':');
    edpts.push({
      protocol: afterStr[0],
      domain: afterStr[1].substring(2),
      port: afterStr[2],
    });
  });

  return edpts;
};

export const edptArrToStringArr = (edpts: SystemEdptType[]) => {
  const arr: string[] = [];
  edpts.forEach((edpt) => {
    arr.push(`${edpt.protocol}://${edpt.domain}:${edpt.port}`);
  });
  console.log();
  return arr;
};

export const edptToString = (edpt: SystemEdptType) => {
  return `${edpt.protocol}://${edpt.domain}:${edpt.port}`;
};

export const stringToEdpt = (str: string) => {
  const afterStr = str.split(':');
  return {
    protocol: afterStr[0],
    domain: afterStr[1].substring(2),
    port: afterStr[2],
  };
};
