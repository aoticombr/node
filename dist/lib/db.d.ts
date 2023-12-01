import { NextFunction } from 'express';
export declare function getConvertQry(filt: []): string;
export declare function getFiltros(req: any): string;
export declare function getLimit(req: any): any;
export declare function StartTransaction(client: any): Promise<boolean>;
export declare function RollBackTransaction(erro: any, client: any): Promise<boolean>;
export declare function CommitTransaction(client: any): Promise<boolean>;
export declare function Connect(): Promise<import("pg").PoolClient>;
export declare function ExecCommand(sql: any, client: any): Promise<boolean>;
export declare function Query(conn: any, sql: any, close?: boolean): Promise<any>;
export declare function Post_Query(select: string, filt: any, plimit: number | undefined, res: any, next: NextFunction): Promise<any>;
export declare function Simple_Query(sql: any, close?: boolean): Promise<any>;
export declare function Simple_Insert_Query(sql: string): Promise<boolean>;
export declare function Insert_Query(sql: string, req: any, res: any, next: NextFunction): Promise<any>;
export declare function Update_Query(//pool:any, 
sql: string, req: any, res: any, next: NextFunction): Promise<any>;
export declare function ApplyStatus(itens: any, status: string): void;
export declare function setQueryJson(sql: string, property: string, cabs: any[]): Promise<void>;
export declare function setProperty(modulo: string, sql: string, json: any): Promise<void>;
