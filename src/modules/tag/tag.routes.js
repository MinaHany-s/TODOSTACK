import express from 'express'
import auth from '../../middlewares/auth.js'
import systemRoles from '../../constants/systemRoles.js'
import validate from '../../middlewares/validate.js'
import asyncHandler from '../../utils/asyncHandler.js'
import * as TV from './tag.validations.js'
import * as TC from './tag.controller.js'


const tagRouter = express.Router()



tagRouter.post('/',
    auth([systemRoles.user]),
    validate(TV.addTagValidation),
    asyncHandler(TC.addTag)
)

tagRouter.get('/',
    auth([systemRoles.user]),
    validate(TV.getTagsValidation),
    asyncHandler(TC.getTags)
)

tagRouter.get('/:tagId',
    auth([systemRoles.user]),
    validate(TV.getTagsByIdValidation),
    asyncHandler(TC.getTagById)
)

tagRouter.patch('/:tagId',
    auth([systemRoles.user]),
    validate(TV.updateTagValidation),
    asyncHandler(TC.updateTag)
)
tagRouter.delete('/:tagId',
    auth([systemRoles.user]),
    validate(TV.deleteTagValidation),
    asyncHandler(TC.deleteTag)
)

tagRouter.patch('/:tagId/toggle-pin',
    auth([systemRoles.user]),
    validate(TV.togglePinTagValidation),
    asyncHandler(TC.togglePinTag)
);


//Future work

// get tags todos

// Search Tags by Name (with query param)

//Clean Unused Tags


export default tagRouter