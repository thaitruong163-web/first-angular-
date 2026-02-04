import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../../../shared/models/comment.model';
import { CommentService } from '../../../../shared/service/comment.service';

@Component({
    standalone: true,
    selector: 'app-comments',
    imports: [CommonModule, FormsModule],
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {
    @Input() productId!: number;

    comments: Comment[] = [];
    loading = true;
    newComment = '';

    constructor(private commentService: CommentService) { }

    ngOnChanges(changes: SimpleChanges):void {
        if (changes['productId'] && this.productId) { 
            this.loadComments();
        }
    }

    loadComments(): void {
        this.loading = true;
        this.commentService.getByProductId(this.productId).subscribe({
            next: (data) => {
                this.comments = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.comments = [];
            }
        });
    }

    addComment(): void {
        const username = JSON.parse(localStorage.getItem('current_user') || 'null')?.username || 'anonymous';
        if (!this.newComment.trim()) return;

        this.commentService.postComment(this.productId, this.newComment.trim(), username).subscribe({
            next: (c) => {
                this.comments = [c, ...this.comments];
                this.newComment = '';
            },
            error: () => {
                const fake: Comment = {
                    id: Date.now(),
                    body: this.newComment.trim(),
                    postId: this.productId,
                    user: { id: 0, username }
                };
                this.comments = [fake, ...this.comments];
                this.newComment = '';
            }
        });
    }
}
