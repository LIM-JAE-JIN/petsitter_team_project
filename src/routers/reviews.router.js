import express from 'express';
import { ReviewsController } from '../controllers/reviews.controller.js';
import { ReviewsService } from '../services/reviews.service.js';
import { ReviewsRepository } from '../repositories/reviews.repository.js';
import { prisma } from '../utils/prisma/index.js'
import auth from '../middlewares/need-signin.middleware.js';

const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);

const reviewsRouter = express.Router();

// 리뷰 생성
reviewsRouter.post('/:sitterId', auth, reviewsController.createReview);

// 리뷰 조회
reviewsRouter.get('/:sitterId', reviewsController.getReviews);

// 리뷰 수정
reviewsRouter.put('/:sitterId/:reviewId', auth, reviewsController.updateReview);

// 리뷰 삭제
reviewsRouter.delete('/:sitterId/:reviewId', auth, reviewsController.deleteReview);

export { reviewsRouter };