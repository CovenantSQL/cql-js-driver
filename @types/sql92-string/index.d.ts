// Type definitions for sql92-string 1.0.0

export function format(sql: string, args: object | any[]): string;
export function escape(value: any): string;
export function escapeId(value: any, dotQualifier?: boolean): string;
export function raw(sql: string): { toSqlString: () => string };
