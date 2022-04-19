import request from '@/common/utils/request.js'

export function getArticleById(id) {
  return request({
    url: `/articles?id=${id}`,
  });
}

export function getArticleCommentById(articleId) {
	return request({
	  url: `/articles/comment?id=${articleId}`,
	});
}