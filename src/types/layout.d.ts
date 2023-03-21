// aside
declare type AsideState = {
	menuList: RouteRecordRaw[];
	clientWidth: number;
}

// navBars tagsView
declare type TagsViewState<T = any> = {
  routeActive: string | T
  routePath: string | unknown
  dropdown:{
    y: string | number
    x: string | number
  }
  sortable:T
  tagsRefsIndex:number
  tagsViewList:T[]
  tagsViewRoutesList:T[]
}

// navBars breadcrumb
declare type BreadcrumbState<T = any> = {
	breadcrumbList: T[];
	routeSplit: string[];
	routeSplitFirst: string;
	routeSplitIndex: number;
};