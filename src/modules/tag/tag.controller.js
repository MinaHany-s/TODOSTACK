import { Tag } from "../../../db/models/tag.model.js"
import appError from "../../utils/appError.js";

export const addTag = async (req, res, next) => {
    const { name, color } = req.body

    const tagExists = await Tag.findOne({ userId: req.user._id, name });
    if (tagExists) {
        return next(new appError("Tag with this name already exists", 409));
    }
    const tag = await Tag.create({
        userId: req.user._id,
        name,
        color
    })
    const populatedTag = await Tag.findById(tag._id).populate({
        path: "userId",
        select: "name email role birthDate"
    });
    const responseTag = {
        ...populatedTag.toObject(),
        user: populatedTag.userId
    };
    delete responseTag.userId
    return res.status(201).json({
        status: "success",
        message: "Tag created successfully",
        tag: responseTag,
        timestamp: new Date().toISOString()
    });
}
export const getTags = async (req, res, next) => {
    const tags = await Tag.find({ userId: req.user._id })
        .sort({ isPinned: -1, createdAt: -1 })
        .select("name color isPinned")
    return res.status(200).json({
        status: "success",
        message: "Tags retrieved successfully",
        tags,
        timestamp: new Date().toISOString()
    });
}
export const getTagById = async (req, res, next) => {
    const { tagId } = req.params
    const tag = await Tag.findOne({ _id: tagId, userId: req.user._id }).select("name color isPinned");
    if (!tag) {
        return next(new appError('Tag is not found', 404));
    }
    return res.status(200).json({
        status: "success",
        message: "Tag retrieved successfully",
        tag,
        timestamp: new Date().toISOString()
    });
}
export const updateTag = async (req, res, next) => {
    const { tagId } = req.params
    const tag = await Tag.findOne({ _id: tagId, userId: req.user._id }).select("name color isPinned");
    if (!tag) {
        return next(new appError('Tag is not found', 404));
    }
    const { name, color } = req.body;

    if (name === tag.name) {
        return next(new appError("Tag with this name already exists", 409));
    }
    if (name && name !== tag.name) {
        const tagExists = await Tag.findOne({
            userId: req.user._id,
            name,
            _id: { $ne: tag._id }
        });

        if (tagExists) {
            return next(new appError("Tag with this name already exists", 409));
        }

        tag.name = name;
    }
    if (color) tag.color = color;

    await tag.save()

    return res.status(200).json({
        status: "success",
        message: "Tag updated successfully",
        tag,
        timestamp: new Date().toISOString()
    });
}
export const deleteTag = async (req, res, next) => {
    const { tagId } = req.params;

    const tag = await Tag.findOneAndDelete({
        _id: tagId,
        userId: req.user._id
    });

    if (!tag) {
        return next(new appError("Tag not found or you don't have permission", 404));
    }

    return res.status(200).json({
        status: "success",
        message: "Tag deleted successfully",
        timestamp: new Date().toISOString()
    });
};

export const togglePinTag = async (req, res, next) => {
    const { tagId } = req.params;

    const tag = await Tag.findOne({
        _id: tagId,
        userId: req.user._id
    });

    if (!tag) {
        return next(new appError("Tag not found", 404));
    }

    tag.isPinned = !tag.isPinned;
    await tag.save();

    return res.status(200).json({
        status: "success",
        message: tag.isPinned ? "Tag pinned successfully" : "Tag unpinned successfully",
        tag,
        timestamp: new Date().toISOString()
    });
};
