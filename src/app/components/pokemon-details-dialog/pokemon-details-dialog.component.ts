import {Component, OnInit} from '@angular/core';
import {PokeapiService} from '../../services/pokeapi.service';
import {flatMap, tap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  styleUrls: ['./pokemon-details-dialog.component.css'],
})
export class PokemonDetailsDialogComponent implements OnInit {
  audio;
  public pokemonName: string;
  private _pokemon: any;
  private _generation: any;

  constructor(private pokeapi: PokeapiService) {

  }

  ngOnInit() {
    this.pokeapi.getPokemonByName(this.pokemonName)
      .pipe(
        tap(pokemon => {
            this._pokemon = pokemon;
            this.getGeneration();
          },
          tap(this.initAudio.bind(this)),
        )
      )
      .subscribe();

  }

  private getGeneration() {
    this.pokeapi.getPokemonGeneration(this._pokemon.species.url).subscribe(
      generation => this._generation = generation
    );
  }

  private initAudio() {
    this.audio = new Audio();
    this.audio.src = 'https://pokemoncries.com/cries-old/' + this._pokemon.id + '.mp3';
    this.audio.load();
    this.audio.play();
  }

  get pokemon() {
    return this._pokemon;
  }

  get generation(): number {
    return this._generation;
  }
}
