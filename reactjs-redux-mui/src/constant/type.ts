import React from "react";
import { RouteObject } from "react-router-dom";

export interface BaseRouterType {
  path: string;
  element: React.FC;
  routes?: RouteObject[];
}

export enum LanguageEnum {
  EN = "en",
  VI = "vi",
}

export type MenuItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  roles: string[];
};

export interface Size {
  width?: number;
  height?: number;
}

export interface IPagination {
  pageNum: number;
  pageSize: number;
  totalCount: number;
}

export interface IResponse<T> {
  data: T[];
  code: string;
}

export interface IResponsePagination<T> extends IResponse<T> {
  pagination: IPagination;
}

export interface PaginationInterface {
  pageNum: number;
  pageSize: number;
}
