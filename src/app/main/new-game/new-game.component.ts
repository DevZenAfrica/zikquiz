import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/_services/authentication.service";

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit, OnDestroy {

  title: string = "new_game.title";
  object: any = {};
  public progress: number = 0;
  public percent: number = 0;
  public count_down: number = 0;
  protected interval: any;
  protected interval_by_q: any;
  public img: string = "logo.png";
  loadingStart: boolean = false;
  is_load: boolean = true;
  disabled: boolean = false;
  message: string;
  last_test: any;
  current_user: any;
  response: any = {
    data: false,
    back: 0,
    /*values: {
      questions: [
        {
          "id": 1,
          "label_fr": "MTN est un groupe :",
          "label_en": "MTN est un groupe :",
          "answers": [
            {
              "id": 1,
              "label_fr": "Camerounais",
              "label_en": "Camerounais",
              "is_good_answer": false,
              "question_id": 1
            },
            {
              "id": 2,
              "label_fr": "Nig\u00e9rian",
              "label_en": "Nig\u00e9rian",
              "is_good_answer": false,
              "question_id": 1
            },
            {
              "id": 3,
              "label_fr": "Sud Africain",
              "label_en": "Sud Africain",
              "is_good_answer": true,
              "question_id": 1
            }
          ]
        },
        {
          "id": 2,
          "label_fr": "Ayoba de MTN est ",
          "label_en": "Ayoba de MTN est ",
          "answers": [
            {
              "id": 4,
              "label_fr": "Un programme de fid\u00e9lit\u00e9",
              "label_en": "Un programme de fid\u00e9lit\u00e9",
              "is_good_answer": false,
              "question_id": 2
            },
            {
              "id": 5,
              "label_fr": "Une application de messagerie instantan\u00e9e",
              "label_en": "Une application de messagerie instantan\u00e9e",
              "is_good_answer": true,
              "question_id": 2
            },
            {
              "id": 6,
              "label_fr": "Un groupe WhatsApp",
              "label_en": "Un groupe WhatsApp",
              "is_good_answer": false,
              "question_id": 2
            }
          ]
        },
        {
          "id": 3,
          "label_fr": "MTN a \u00e9t\u00e9 cr\u00e9e au Cameroun en ",
          "label_en": "MTN a \u00e9t\u00e9 cr\u00e9e au Cameroun en ",
          "answers": [
            {
              "id": 7,
              "label_fr": "1999",
              "label_en": "1999",
              "is_good_answer": false,
              "question_id": 3
            },
            {
              "id": 8,
              "label_fr": "2000",
              "label_en": "2000",
              "is_good_answer": true,
              "question_id": 3
            },
            {
              "id": 9,
              "label_fr": "2001",
              "label_en": "2001",
              "is_good_answer": false,
              "question_id": 3
            }
          ]
        },
        {
          "id": 4,
          "label_fr": "MTN Yamo est une offre sp\u00e9cifique pour",
          "label_en": "MTN Yamo est une offre sp\u00e9cifique pour",
          "answers": [
            {
              "id": 10,
              "label_fr": "Les jeunes",
              "label_en": "Les jeunes",
              "is_good_answer": true,
              "question_id": 4
            },
            {
              "id": 11,
              "label_fr": "Les PME",
              "label_en": "Les PME",
              "is_good_answer": false,
              "question_id": 4
            },
            {
              "id": 12,
              "label_fr": "Les TPE",
              "label_en": "Les TPE",
              "is_good_answer": false,
              "question_id": 4
            }
          ]
        },
        {
          "id": 5,
          "label_fr": "L'application Yabadoo de MTN permet de",
          "label_en": "L'application Yabadoo de MTN permet de",
          "answers": [
            {
              "id": 13,
              "label_fr": "Suivre les informations",
              "label_en": "Suivre les informations",
              "is_good_answer": false,
              "question_id": 5
            },
            {
              "id": 14,
              "label_fr": "Regarder les programmes TV",
              "label_en": "Regarder les programmes TV",
              "is_good_answer": true,
              "question_id": 5
            },
            {
              "id": 15,
              "label_fr": "Prendre des photos",
              "label_en": "Prendre des photos",
              "is_good_answer": false,
              "question_id": 5
            }
          ]
        },
        {
          "id": 6,
          "label_fr": "MTN Wanda est un programme pour",
          "label_en": "MTN Wanda est un programme pour",
          "answers": [
            {
              "id": 16,
              "label_fr": "Le business",
              "label_en": "Le business",
              "is_good_answer": false,
              "question_id": 6
            },
            {
              "id": 17,
              "label_fr": "Les jeunes",
              "label_en": "Les jeunes",
              "is_good_answer": false,
              "question_id": 6
            },
            {
              "id": 18,
              "label_fr": "Tous les utilisateurs",
              "label_en": "Tous les utilisateurs",
              "is_good_answer": true,
              "question_id": 6
            }
          ]
        },
        {
          "id": 7,
          "label_fr": "Avec Facebook Flex tu peux",
          "label_en": "Avec Facebook Flex tu peux",
          "answers": [
            {
              "id": 19,
              "label_fr": "Te connecter sur facebook sans \u00eatre d\u00e9bit\u00e9 de Data",
              "label_en": "Te connecter sur facebook sans \u00eatre d\u00e9bit\u00e9 de Data",
              "is_good_answer": true,
              "question_id": 7
            },
            {
              "id": 20,
              "label_fr": "Manager plusieurs comptes facebook",
              "label_en": "Manager plusieurs comptes facebook",
              "is_good_answer": false,
              "question_id": 7
            },
            {
              "id": 21,
              "label_fr": "Jouer \u00e0 des jeux en ligne",
              "label_en": "Jouer \u00e0 des jeux en ligne",
              "is_good_answer": false,
              "question_id": 7
            }
          ]
        },
        {
          "id": 8,
          "label_fr": "MTN Unlimitext est un forfait :",
          "label_en": "MTN Unlimitext est un forfait :",
          "answers": [
            {
              "id": 22,
              "label_fr": "SMS",
              "label_en": "SMS",
              "is_good_answer": true,
              "question_id": 8
            },
            {
              "id": 23,
              "label_fr": "Appels",
              "label_en": "Appels",
              "is_good_answer": false,
              "question_id": 8
            },
            {
              "id": 24,
              "label_fr": "Internet",
              "label_en": "Internet",
              "is_good_answer": false,
              "question_id": 8
            }
          ]
        },
        {
          "id": 9,
          "label_fr": "Cette ann\u00e9e, MTN Cameroun c\u00e9l\u00e8bre ces 20ans",
          "label_en": "Cette ann\u00e9e, MTN Cameroun c\u00e9l\u00e8bre ces 20ans",
          "answers": [
            {
              "id": 25,
              "label_fr": "Vrai",
              "label_en": "Vrai",
              "is_good_answer": true,
              "question_id": 9
            },
            {
              "id": 26,
              "label_fr": "Faux",
              "label_en": "Faux",
              "is_good_answer": false,
              "question_id": 9
            }
          ]
        },
        {
          "id": 10,
          "label_fr": "En quelle ann\u00e9e a \u00e9t\u00e9 cr\u00e9\u00e9 MTN Foundation :",
          "label_en": "En quelle ann\u00e9e a \u00e9t\u00e9 cr\u00e9\u00e9 MTN Foundation :",
          "answers": [
            {
              "id": 27,
              "label_fr": "2006",
              "label_en": "2006",
              "is_good_answer": false,
              "question_id": 10
            },
            {
              "id": 28,
              "label_fr": "2005",
              "label_en": "2005",
              "is_good_answer": true,
              "question_id": 10
            },
            {
              "id": 29,
              "label_fr": "2008",
              "label_en": "2008",
              "is_good_answer": false,
              "question_id": 10
            }
          ]
        }
      ]
    }*/
  };

  play_sound: any = {
    play_sound: null,
    good_sound: null,
    fail_sound: null,
    waiting_bg: null,
    counter: 0
  };

  formatTitle = (percent: number = 0): string => {
    return this.config.configuration.nb_times_play - this.progress + '';// + '/' + this.config.configuration.nb_times_play;
  };
  private config: any;

  constructor(private _auth: AuthenticationService) {
    //this.count_down_play();
  }

  count_down_play() {
    if (this.play_sound.countdown)
      this.play_sound.countdown.play();
    const inter = setInterval(() => {
      this.play_sound.counter -= 1;
      // this.playAudio('waiting_bg', false);
      if (this.play_sound.counter === 0) {
        clearInterval(inter);
        if (this.play_sound.countdown) {
          this.play_sound.countdown.pause();
          this.play_sound.countdown.currentTime = 0;
          this.play_sound.countdown = null;
        }
      }
    }, 900);
  }

  __init(launchLoader?) {
    this.interval = null;
    this.progress = 0;
    this.percent = 0;
    this.count_down = 0;
    this.img = "logo.png";
    this.disabled = false;
    this.response = {
      show_btn: false,
      restart: false,
      back: 0,
      good: 0,
      data: false,
      values: null
    };
    this.title = "new_game.title";

    this.object = {
      question_start: 0,
      global_val_show: 0,
      global_val: this.config.configuration.nb_times_play / this.config.list.length,
      nb_times_play: this.config.configuration.nb_times_play,//+ (this.config.list.length * this.config.configuration.time_per_question_play),
      list: JSON.parse(JSON.stringify(this.config.list))
    };
    this.object.time_play = this.object.global_val;
    this.object.time_count = Number((100 / (this.object.nb_times_play || 100)).toFixed(2));
    console.log(this.object);

    if (this.play_sound.waiting_bg) {
      this.play_sound.waiting_bg.pause();
      this.play_sound.waiting_bg.currentTime = 0;
      this.play_sound.waiting_bg = null;
    }

    if (launchLoader) {
      //this.reset_q_by_time();
      launchLoader();
    }
  }

  ngOnInit(): void {
    this.current_user = this._auth.currentUserValue;
    this.playAudio('countdown', true);

    this._auth.api.getStatusLoader().subscribe(status => {
      this.is_load = status;
    });
  }

  reset_q_by_time() {
    if (this.object.global_val_show !== this.config.configuration.nb_times_play) {
      this.percent += ((100 * this.object.time_play) / this.config.configuration.nb_times_play);
      this.object.global_val_show = this.object.global_val_show + this.object.global_val;
      this.disabled = false;
      //this.object.time_play = this.config.configuration.nb_times_play / this.object.list.length;
      this.interval_by_q = setTimeout(() => {
        this.continue_question();
      }, this.object.time_play * 1000);
    }
  }

  load_data() {
    this._auth.api.is_loader(true);
    this._auth.api.request('data@get', 'config_questions')
      .subscribe(data => {
        this._auth.api.is_loader(false);
        this.config = data;
        this.config.values = JSON.parse(atob(atob(this.config.token_value_confirm)));

        if (!localStorage.getItem('own_user_access'))
          localStorage.setItem('own_user_access', 'yes');

        if (this.config.configuration && this.config.list)
          this.__init(this.launch_loader);
      }, err => {
        this._auth.api.is_loader(false);
        if (err.error.message)
          this._auth.api.toast.error(err.error.message);
      })
  }

  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 230);
  }

  launch_loader = () => {
    if (this.config) {
      this.loadingStart = true;
      this.object.open = true;
      this.startInterval();
    }
  };

  continue_question(id?, index_q = 0) {
    let q = this.object.list[index_q];
    q.responses.map((it) => {
      it.good = this.config.values.indexOf(it.id) > -1;
      return it;
    });

    if (id && (this.config.values.indexOf(id) > -1)) {
      this.response.good++
    }

    if (this.object.question_start + 1 >= this.object.list.length) {
      if (this.interval) {
        this.last_test = JSON.parse(JSON.stringify(this.object.list));
        this.stopInterval();
        this.save_request();
        if (this.play_sound.quiz_bg2) {
          this.play_sound.quiz_bg2.pause();
          this.play_sound.quiz_bg2.currentTime = 0;
          this.play_sound.quiz_bg2 = null;
        }

        if (this.play_sound.waiting_bg)
          this.play_sound.waiting_bg.play();
      }
    } else {
      this.object.question_start++;
      /*
      setTimeout(() => {
        this.reset_q_by_time();
      }, this.config.configuration.time_per_question_play * 1000)
      */
    }
  }

  startInterval(time: number = 1000) {
    if (!this.interval) {
      this.progress = 0;
      this.percent = 100;
      this.play_sound.counter = 3;
      const interval_time = this.object.nb_times_play;
      this.count_down_play();
      this.playAudio('quiz_bg2', true);
      setTimeout(() => {
        if (this.play_sound.quiz_bg2)
          this.play_sound.quiz_bg2.play();
        this.playAudio('waiting_bg', true);
        this.interval = setInterval(() => {
          this.progress += 1;
          this.percent = 100 - (this.progress * 100) / interval_time;
          if (this.progress === interval_time) {
            this.last_test = JSON.parse(JSON.stringify(this.object.list));
            this.stopInterval();
            this.save_request();
            if (this.play_sound.quiz_bg2) {
              this.play_sound.quiz_bg2.pause();
              this.play_sound.quiz_bg2.currentTime = 0;
              this.play_sound.quiz_bg2 = null;
            }

            if (this.play_sound.waiting_bg)
              this.play_sound.waiting_bg.play();
            this.percent = 0;
          }
        }, time);
      }, 3000);
    }
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  save_request() {
    if (this.last_test) {
      console.log(this.last_test);
      this.response.show_btn = false;
      this.response.restart = false;
      this.is_load = false;
      this.disabled = true;
      this._auth.api.is_loader(true);
      this._auth.api.request('data@post', 'save_answer',
        {
          list_question: this.last_test.map((it) => {
            return {
              id: it.id,
              answer_id: it.answer_id
            }
          }), ref_token: this.config.ref_token, time_total: this.progress
        })
        .subscribe((data) => {
          this._auth.api.is_loader(false);
          this._auth.api.toast.success(data.message);
          //this.load_data();
          this.last_test = null;
          this.response.restart = true;
          this.response.data = true;
          this.response.values = data.report;
          this.title = "new_game.report_part";
        }, err => {
          this._auth.api.is_loader(false);

          if (err.error.message)
            this._auth.api.toast.error(err.error.message);

          if (err.status !== 403) {
            this.response.show_btn = true;
            this.is_load = true;
          } else {
            this.response.restart = true;
          }
          console.log(err);
        });
    }
  }

  switch_question(back: boolean = false) {
    if (back) {
      if (this.response.back > 0)
        --this.response.back;
    } else {
      if (this.response.back < this.response.values.questions.length - 1)
        ++this.response.back;
    }
  }

  ngOnDestroy(): void {
    this.stopInterval();

    if (this.play_sound.countdown) {
      this.play_sound.countdown.pause();
      this.play_sound.countdown.currentTime = 0;
      this.play_sound.countdown = null;
    }

    if (this.play_sound.quiz_bg2) {
      this.play_sound.quiz_bg2.pause();
      this.play_sound.quiz_bg2.currentTime = 0;
      this.play_sound.quiz_bg2 = null;
    }

    if (this.play_sound.waiting_bg) {
      this.play_sound.waiting_bg.pause();
      this.play_sound.waiting_bg.currentTime = 0;
      this.play_sound.waiting_bg = null;
    }
  }

  playAudio(property: string, loop: boolean) {
    if (this.current_user.is_sound) {
      this.play_sound[property] = new Audio();
      this.play_sound[property].src = "assets/audio/" + property + ".ogg";
      this.play_sound[property].load();
      this.play_sound[property].loop = loop;
    }
    //this.play_sound[property].play();
  }
}
