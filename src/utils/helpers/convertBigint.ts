// import { formatUnits }  from "ethers"

const convertBigInt = (num: bigint): bigint => {
  // Divide BigInt by 10^18 (BigInt operation)
  // const result = formatUnits(num, 18);

  // return Number(result);

  return num;
};

export { convertBigInt };
