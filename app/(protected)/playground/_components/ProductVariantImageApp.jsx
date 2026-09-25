"use client";

import { useMemo, useState } from "react";

/* ==================== MASTER DATA ==================== */
const categories = [
    { id: "clothing", name: "Clothing" },
    { id: "footwear", name: "Footwear" },
    { id: "toys", name: "Toys & Games" },
];

const subcategories = [
    { id: "dresses", name: "Dresses", categoryId: "clothing", variantAttributes: ["color", "size"], imageGroupBy: ["color"] },
    { id: "t-shirts", name: "T-Shirts", categoryId: "clothing", variantAttributes: ["color", "size"], imageGroupBy: ["color"] },
    { id: "shoes", name: "Shoes", categoryId: "footwear", variantAttributes: ["color", "shoeSize"], imageGroupBy: ["color"] },
    { id: "dolls", name: "Dolls", categoryId: "toys", variantAttributes: ["design", "size"], imageGroupBy: ["design"] },
];

/* ==================== HELPERS ==================== */
const createId = () => crypto.randomUUID();

const label = (value) =>
    value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function emptyVariant(attributes) {
    return {
        id: createId(),
        attributes: Object.fromEntries(attributes.map((a) => [a, ""])),
        quantity: "",
        cost: "",
        price: "",
    };
}

/* ==================== IMAGE GROUPING ==================== */
function generateImageGroups(variants, imageGroupBy) {
    const groups = new Map();

    for (const variant of variants) {
        const values = {};
        let valid = true;

        for (const attribute of imageGroupBy) {
            const value = variant.attributes[attribute]?.trim();
            if (!value) {
                valid = false;
                break;
            }
            values[attribute] = value;
        }

        if (!valid) continue;

        const key = imageGroupBy.map((a) => values[a]).join("::");

        if (!groups.has(key)) {
            groups.set(key, { key, values, variantIds: [] });
        }

        groups.get(key).variantIds.push(variant.id);
    }

    return [...groups.values()];
}

/* ==================== APP ==================== */
export default function ProductVariantImageApp() {
    /* ==================== STATE ==================== */
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subcategoryId, setSubcategoryId] = useState("");
    const [variants, setVariants] = useState([]);
    const [imageFiles, setImageFiles] = useState({});

    /* ==================== DERIVED DATA ==================== */
    const availableSubcategories = useMemo(
        () => subcategories.filter((s) => s.categoryId === categoryId),
        [categoryId]
    );

    const selectedSubcategory = useMemo(
        () => subcategories.find((s) => s.id === subcategoryId),
        [subcategoryId]
    );

    const imageGroups = useMemo(() => {
        if (!selectedSubcategory) return [];
        return generateImageGroups(variants, selectedSubcategory.imageGroupBy);
    }, [variants, selectedSubcategory]);

    /* ==================== PRODUCT SELECTION ==================== */
    function changeCategory(e) {
        setCategoryId(e.target.value);
        setSubcategoryId("");
        setVariants([]);
        setImageFiles({});
    }

    function changeSubcategory(e) {
        const id = e.target.value;
        setSubcategoryId(id);
        setImageFiles({});

        const subcategory = subcategories.find((s) => s.id === id);
        setVariants(subcategory ? [emptyVariant(subcategory.variantAttributes)] : []);
    }

    /* ==================== VARIANT ACTIONS ==================== */
    function addVariant() {
        if (!selectedSubcategory) return;
        setVariants((v) => [...v, emptyVariant(selectedSubcategory.variantAttributes)]);
    }

    function cloneVariant(id) {
        setVariants((current) => {
            const index = current.findIndex((v) => v.id === id);
            if (index === -1) return current;

            const source = current[index];
            const clone = {
                ...source,
                id: createId(),
                attributes: { ...source.attributes },
            };

            const next = [...current];
            next.splice(index + 1, 0, clone);
            return next;
        });
    }

    function removeVariant(id) {
        setVariants((v) => v.filter((variant) => variant.id !== id));
    }

    function updateAttribute(id, attribute, value) {
        setVariants((current) =>
            current.map((v) =>
                v.id === id
                    ? { ...v, attributes: { ...v.attributes, [attribute]: value } }
                    : v
            )
        );
    }

    function updateField(id, field, value) {
        setVariants((current) =>
            current.map((v) => (v.id === id ? { ...v, [field]: value } : v))
        );
    }

    /* ==================== IMAGE ACTIONS ==================== */
    function selectImage(groupKey, file) {
        setImageFiles((current) => ({ ...current, [groupKey]: file }));
    }

    /* ==================== FINAL PRODUCT OBJECT ==================== */
    function buildProduct() {
        return {
            id: createId(),
            name: productName,
            categoryId,
            subcategoryId,

            variants: variants.map((v) => ({
                ...v,
                quantity: Number(v.quantity) || 0,
                cost: Number(v.cost) || 0,
                price: Number(v.price) || 0,
            })),

            images: imageGroups.map((group) => ({
                id: createId(),
                group: group.values,
                variantIds: group.variantIds,
                file: imageFiles[group.key] ?? null,
            })),
        };
    }

    /* ==================== SAVE ==================== */
    function saveProduct(e) {
        e.preventDefault();
        console.log("PRODUCT:", buildProduct());
    }

    /* ==================== UI ==================== */
    return (
        <main>
            <h1>Add Product</h1>

            <form onSubmit={saveProduct}>
                {/* ==================== PRODUCT INFO UI ==================== */}
                <section>
                    <h2>Product Info</h2>

                    <label>
                        Product Name_____
                        <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Floral Summer Dress"
                        />
                    </label>

                    <br />

                    <label>
                        Category________
                        <select value={categoryId} onChange={changeCategory}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <br />

                    <label>
                        Subcategory_____
                        <select
                            value={subcategoryId}
                            onChange={changeSubcategory}
                            disabled={!categoryId}
                        >
                            <option value="">Select Subcategory</option>
                            {availableSubcategories.map((subcategory) => (
                                <option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </section>

                <hr />

                {/* ==================== VARIANTS UI ==================== */}
                <section className="variants-section mt-10">
                    <h2>Variants</h2>

                    {selectedSubcategory && (
                        <>
                            <table border="1" cellPadding="6">
                                <thead>
                                    <tr>
                                        {selectedSubcategory.variantAttributes.map((attribute) => (
                                            <th key={attribute}>{label(attribute)}</th>
                                        ))}
                                        <th>Qty</th>
                                        <th>Cost</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {variants.map((variant) => (
                                        <tr key={variant.id}>
                                            {selectedSubcategory.variantAttributes.map((attribute) => (
                                                <td key={attribute}>
                                                    s
                                                    <input
                                                        value={variant.attributes[attribute] ?? ""}
                                                        onChange={(e) =>
                                                            updateAttribute(variant.id, attribute, e.target.value)
                                                        }
                                                    />
                                                </td>
                                            ))}

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={variant.quantity}
                                                    onChange={(e) =>
                                                        updateField(variant.id, "quantity", e.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={variant.cost}
                                                    onChange={(e) =>
                                                        updateField(variant.id, "cost", e.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={variant.price}
                                                    onChange={(e) =>
                                                        updateField(variant.id, "price", e.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <button type="button" onClick={() => cloneVariant(variant.id)}>
                                                    +
                                                </button>
                                                <button type="button" onClick={() => removeVariant(variant.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button type="button" onClick={addVariant}>
                                + Add Variant
                            </button>
                        </>
                    )}
                </section>

                <hr />

                {/* ==================== AUTO-GENERATED IMAGE UI ==================== */}
                <section className="mt-10">
                    <h2>Product Images</h2>

                    {imageGroups.map((group) => (
                        <article key={group.key}>
                            <h3>
                                {selectedSubcategory.imageGroupBy
                                    .map((attribute) => group.values[attribute])
                                    .join(" / ")}
                            </h3>

                            <p>{group.variantIds.length} variants</p>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    selectImage(group.key, e.target.files?.[0] ?? null)
                                }
                            />

                            {imageFiles[group.key] && (
                                <p>{imageFiles[group.key].name}</p>
                            )}
                        </article>
                    ))}
                </section>

                <hr />

                {/* ==================== SAVE UI ==================== */}
                <button type="submit" className="mt-10">Save Product</button>
            </form>
        </main>
    );
}