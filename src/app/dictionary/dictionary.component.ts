import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchWordService } from 'src/core/services/search-word.service';
// import Speach from 'speak-tts'

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  constructor(private searchWordService: SearchWordService) { }
  searchData!: string;
  results!: any;
  searchForm = new FormGroup({
    searchValue: new FormControl()
  })

  ngOnInit(): void {
    if ('speechSynthesis' in window) {
      console.log('Speech Synthesis is supported 🎉')
    } else {
      console.log('Speech Synthesis is not Supported 😞')
    }
  }

  search(e: any) {
    let data = this.searchForm.value.searchValue
    this.searchData = data.charAt(0).toUpperCase() + data.slice(1)
    console.log(this.searchData)
    if (this.searchData.length != 0) {
      e.blur()
      this.searchWordService.loadData(this.searchData).subscribe((res: any) => {
        if (res.list.length != 0) {
          this.results = res?.list
          console.table(this.results)

        } else {
          console.error('not found')
        }
      }), console.error();

    }
  }

  playSpeech(word: string) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.volume = 1; // From 0 to 1
    utterance.rate = 1; // From 0.1 to 10
    utterance.pitch = 2; // From 0 to 2
    utterance.text = word;
    utterance.lang = 'en';
    speechSynthesis.speak(utterance);
  }
  pauseSpeech(){
    speechSynthesis.pause()
  }
  stopSpeech(){
    speechSynthesis.cancel()
  }
}
