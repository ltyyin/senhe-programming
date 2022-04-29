import request from '@/common/utils/request.js'

export function getQuestionDetail(id) {
  return request({
    url: `/questions?id=${id}`,
  });
}

export function getQuestionCommentById(id) {
	return request({
	  url: `/questions/comment?id=${id}`,
	});
}