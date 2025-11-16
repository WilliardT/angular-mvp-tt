import {Component, inject, signal} from '@angular/core';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {ProfileService} from '../../data/services/profile';
import {IProfile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  protected readonly title = signal('tick-talk');

  profileService = inject(ProfileService);

  profiles: IProfile[] = []

  constructor() {
    this.profileService.getTestAccount()
      .subscribe((data: IProfile[]) => {
        this.profiles = data
      })
  }
}
