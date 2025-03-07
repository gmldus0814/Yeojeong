// components/WritePost.js
import React, { useState } from 'react';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !author) {
      setError('모든 필드를 입력해주세요!');
      return;
    }
    setError('');
    // 글 저장 로직 (예: API로 전송)
    console.log('Post submitted:', { title, content, author });
    // 폼 초기화
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">글 작성</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-gray-100"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-gray-100"
            rows="5"
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">작성자</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-gray-100"
            placeholder="작성자를 입력하세요"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            글 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
