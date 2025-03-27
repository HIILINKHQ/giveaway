
export const formatStr = (str: string = "0") => {
    return `0x${str?.substring(str?.length - 3, str?.length)}`;
  };

