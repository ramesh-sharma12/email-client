﻿/// <reference path='../_references.d.ts' />

module Utilites
{
	export class ObjectHelper
	{		
		public static compareObjects(o1, o2)
		{
			if(!(o1 && o2)) return false;

			for(var p in o1){
				if(o1.hasOwnProperty(p)){
					if(o1[p] !== o2[p]){
						return false;
					}
				}
			}
			for(var p in o2){
				if(o2.hasOwnProperty(p)){
					if(o1[p] !== o2[p]){
						return false;
					}
				}
			}
			return true;
		};
	}
}

export = Utilites;