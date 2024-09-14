const express = require('express');
const Content = require('../models/Content');

const router = express.Router();

router.post('/newpost', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newContent = new Content({title, content, author});

    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ message: '글 작성 실패', error });
  }
});

router.get('/', async (req, res) => {
  try{
    const contents = await Content.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({message: '콘텐츠 조회 실패', error })
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;

  try{
    const content =  await Content.findById(id);

    if(!content) {
      return res.status(404).json({message: '글 조회 실패'});
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({message: '글 조회 실패', error});
  }
});

router.patch('/:id', async(req, res) => {
  const {id} = req.params;
  const { title, content } = req.body;

  try{
    const updatedContent = await Content.findByIdAndUpdate(
        id,
        {title, content},
        {new: true}
    );

    if (!updatedContent) {
      return res.status(404).json({message: '글을 찾을 수 없습니다.'});
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({message: '글 수정 실패', error});
  }
});

router.delete('/:id', async(req, res) => {
  const {id} = req.params;

  try{
    const deletedContent =  await Content.findByIdAndDelete(id);

    if(!deletedContent) {
      return res.status(404).json({message: '삭제할 글을 찾을 수 없습니다.'});
    }
    res.status(200).json({message: '글이 성공적으로 삭제되었습니다.', deletedContent});
  } catch (error) {
    res.status(500).json({message: '글 삭제 실패', error});
  }
});

module.exports = router;
