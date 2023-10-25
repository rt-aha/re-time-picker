export const matchedHhRegExp = /h/;
export const validHmRegExp = /([0-9]{1,2}:[0-9]{1,2})/;
export const validHmsRegExp = /([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})/;
export const validHmFormatRegExp = /([H|h]{1,2}:[m]{1,2})/;
export const validHmsFormatRegExp = /([H|h]{1,2}:[m]{1,2}:[s]{1,2})/;
export const validHmWithGroupRegExp = /([0-9]{1,2}):([0-9]{1,2})/;
export const validHmsWithGroupRegExp = /([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/;
export const validRegExp = /^([H|h]{1,2})(:)([m]{1,2})(:)?([s]{1,2})?( )?([A|a]{1})?$/;
export const formatMappingRegExp = /[H|h|m|s|A|a]{1,2}/g;
export type HMode = '12h' | '24h';

export type ValueMatchFormatType = 'hmsa' | 'hms' | 'hma' | 'hm';
export type TlRefKey = 'tlh' | 'tlm' | 'tls' | 'tlapm';
export type HmsType = 'h' | 'm' | 's';
export type TypeLabelKey = 'h' | 'm' | 's' | 'apm';
export type TimeData = {
  [key in TypeLabelKey]: string
};

export type SetScrollTopStrategies = {
  [key in TlRefKey]: Function
};
export interface TimeList {
  h: Array<string>
  m: Array<string>
  s: Array<string>
  apm: Array<ApmCustomTextUnion | ''>
}

export type HourTokens = 'HH' | 'H' | 'hh' | 'h';
export type MinTokens = 'mm' | 'm';
export type SecTokens = 'ss' | 's';
export type AmpTokens = 'A' | 'a';
export type TokensUnion = HourTokens | MinTokens | SecTokens | AmpTokens;
export type AllTokens = {
  [key in TokensUnion]: string
};
export type FormatType = 'HMS' | 'HM' | null;
export type ApmColumnPlacement = 'first' | 'last';

export type CustomTextUnion = 'apm' | 'am' | 'pm' | 'hour' | 'min' | 'sec';
export type CustomText = {
  [key in CustomTextUnion]: string
  // apm: string
  // am: string
  // pm: string
  // hour: string
  // min: string
  // sec: string
};

export type ApmCustomTextUnion = Extract<CustomTextUnion, 'am' | 'pm'>;
export type ApmCustomText = {
  [key in ApmCustomTextUnion]: string
};

export const defaultText: CustomText = {
  am: 'AM',
  pm: 'PM',
  hour: 'Hour',
  min: 'Min',
  sec: 'Sec',
  apm: 'AM/PM',
};

interface ValidTokens {
  hour: HourTokens[]
  min: MinTokens[]
  sec: SecTokens[]
  amp: AmpTokens[]
}

export const validTokens: ValidTokens = {
  hour: ['H', 'HH', 'hh', 'h'],
  min: ['mm', 'm'],
  sec: ['ss', 's'],
  amp: ['A', 'a'],
};

export type CusTimeListRange = Array<[number, number] | number>;

const genFullRenderList = (min: number, max: number) => {
  const timeList = [];
  for (let i = min; i <= max; i++) {
    timeList.push(i);
  }

  return timeList;
};

type hmsType = 'h' | 'm' | 's';
const timeRange: Record<hmsType, { min: number; max: number }> = {
  h: { min: 0, max: 23 },
  m: { min: 0, max: 59 },
  s: { min: 0, max: 59 },
};

interface GenTimeListOptions {
  hourInterval?: number
  minInterval?: number
  secInterval?: number
  isValidAType?: boolean
  interval?: number

}

const checkIsLegalTimeListArray = (arr: number[] | number): boolean => {
  try {
    /** check is array
        check has two number
        check second is larger than first
     */
    if (Array.isArray(arr)) {
      const [firstVal, secondVal] = arr;
      const isFirstVal = typeof firstVal === 'number';
      const isSecondVal = typeof secondVal === 'number';
      if (isFirstVal && isSecondVal) {
        if (secondVal > firstVal) {
          return true;
        }
      }
    }
    return false;
  }
  catch {
    return false;
  }
};

/**
 * push in to timeList
 * 1. filter hMode
 * 2. remove duplicate
 * 3. sort
 */

const genFullRange = (type: HmsType, hMode: HMode, list: CusTimeListRange) => {
  let limit = 0;

  if (type === 'h') {
    if (hMode === '12h') {
      limit = 12;
    }
    else {
      limit = 24;
    }
  }
  else {
    limit = 60;
  }

  let fullRange: number[] = [];
  const pushToRange = (num: number) => {
    if (num >= 0 && num < limit) {
      fullRange.push(num);
    }
  };

  list.forEach((item) => {
    const isLegalArray = checkIsLegalTimeListArray(item);

    if (typeof item === 'number') {
      pushToRange(item);
    }
    else if (isLegalArray) {
      for (let j = item[0]; j <= item[1]; j++) {
        pushToRange(j);
      }
    }
  });

  fullRange = fullRange.filter((item, index, arr) => {
    return arr.indexOf(item, 0) === index;
  });

  fullRange.sort((x, y) => {
    if (x === y) {
      return 0;
    }

    if (x > y) {
      return 1;
    }
    else {
      return -1;
    }
  });

  return fullRange;
};

const validIsAllNumber = (tempRange: any[]): boolean => {
  const isValid = tempRange.every((item) => {
    if (Array.isArray(item)) {
      return validIsAllNumber(item);
    }

    return typeof item === 'number';
  });

  return isValid;
};

const genBasicRange = (type: HmsType, range: any[]): CusTimeListRange => {
  let embryoRange: CusTimeListRange = [];
  let isValidRange = false;
  if (Array.isArray(range) && range.length > 0) {
    isValidRange = validIsAllNumber(range);
  }

  if (isValidRange) {
    embryoRange = range;
  }
  else {
    embryoRange = genFullRenderList(timeRange[type].min, timeRange[type].max);
  }

  return embryoRange;
};

type GenTimeList = (type: hmsType, range: CusTimeListRange, hMode: HMode, showHeader: boolean, options: GenTimeListOptions) => string[];
export const genTimeList: GenTimeList = (type, range, hMode, showHeader, options) => {
  const basicRange = genBasicRange(type, range);
  let fullRange = genFullRange(type, hMode, basicRange);

  const interval = options?.interval;

  if (interval) {
    fullRange = fullRange.filter(item => item % interval === 0);
  }

  const timeList: string[] = [];
  const emptyItems = showHeader ? ['', '', ''] : ['', '', ''];

  timeList.push(...emptyItems);
  for (let i = 0; i < fullRange.length; i++) {
    let item = fullRange[i].toString();
    if (fullRange[i] < 10) {
      item = `0${item}`;
    }

    timeList.push(item);
  }
  timeList.push(...emptyItems);

  return timeList;
};

export const defaultFormat = 'HH:mm:ss A';

// export const apm: (showHeader: boolean) => string[] = (showHeader) => {
//   const emptyItems = showHeader ? ['', '', ''] : ['', '', ''];

//   return [...emptyItems, 'am', 'pm', ...emptyItems];
// };

export const apm: Array<ApmCustomTextUnion | ''> = ['', '', '', 'am', 'pm', '', '', ''];
