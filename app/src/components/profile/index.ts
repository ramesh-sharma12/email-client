/// <reference path='../../_references.d.ts' />

import {Component, View, Inject} from 'angular2/core';
import {IProfileService,ProfileService} from '../../services/profileService';
import {Profile} from '../../models/Profile';


@Component({
    selector: 'component-2',
     templateUrl: './src/components/profile/index.html'
})

export default class ProfileIndex
{
	public profileService : IProfileService;
    public profile: Profile;

	constructor(@Inject(ProfileService) ProfileService : IProfileService){
		this.profileService = ProfileService;

		this.profile = new Profile();
	}

	getData(status : number): void {      
		var self = this;

		this.profileService.get({}, '', '')
				.subscribe((response) => {			
					self.profile = response[0];
		        });
    }
}

