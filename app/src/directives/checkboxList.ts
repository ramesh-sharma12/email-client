/// <reference path='../_references.d.ts' />

import {Directive, View} from 'angular2/core';

@Directive({
    selector: 'checkbox-list',
    properties: [
        'text: tooltip'
    ]
})

@View({
    template: '<ul style="padding-left: 10px;">' +
    '<li style="list-style: none;" template="ng-for #item of list; #i = index">' +
    '<div class="checkbox"><label>' +
    '<input type="checkbox" value="{{item.value}}" ng-checked="item.checked" ng-click="toggle($index)" />' +
    '{{item.label}}' +
    ' </label></div></li></ul>'
})

    export class CheckboxList
    {
        tempList: Array<any>;
        itemList: Array<any>;
        selection: Array<any>;
        preselectedfilter: any;
        value: any;

        constructor()
        {
            //this.tempList = [];
            //this.selection = [];
            //this.tempList = [];
            //this.preselectedfilter = {};
            //this.value = {};

            //this.itemList.forEach(function (item) {
            //    var isChecked;

            //    if (this.preselectedfilter === item.Value) {
            //        isChecked = true;
            //        this.selection.push(item[this.value]);
            //    } else {
            //        isChecked = this.selection.indexOf(item[this.value]) > -1;
            //    }

            //    this.tempList.push({
            //        value: item[this.value],
            //        label: item[this.label],
            //        checked: isChecked
            //    });
            //});
        }

        toggle(index)
        {
            var item = this.tempList[index],
                i = this.selection.indexOf(item.value);
            item.checked = !item.checked;
            if (!item.checked && i > -1)
            {
                this.selection.splice(i, 1);
            } else if (item.checked && i < 0)
            {
                this.selection.push(item.value);
            }
        }
    }