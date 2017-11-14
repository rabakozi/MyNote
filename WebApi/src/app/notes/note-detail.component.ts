import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  nodeId: number;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.nodeId = params['id'];
    });
  }

  ngOnInit() {
    
  }

}
