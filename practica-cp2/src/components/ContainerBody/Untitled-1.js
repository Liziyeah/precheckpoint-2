import { useEffect, useState } from "react";
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import { Body } from "../Body/Body";

export const ContainerBody = () => {
    const [data, setData] = useState({ bodies: [] });
    const [displayedBodies, setDisplayedBodies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sortCriteria, setSortCriteria] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [othersMenuAnchor, setOthersMenuAnchor] = useState(null);
    const [otherFiltersMenuAnchor, setOtherFiltersMenuAnchor] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.bodies) {
            let filteredBodies = [...data.bodies];
            
            // Apply filters
            if (activeFilters.includes("isPlanet")) {
                filteredBodies = filteredBodies.filter(body => body.isPlanet);
            }
            if (activeFilters.includes("isNotPlanet")) {
                filteredBodies = filteredBodies.filter(body => !body.isPlanet);
            }
            if (activeFilters.includes("hasGravity")) {
                filteredBodies = filteredBodies.filter(body => body.gravity && body.gravity > 0);
            }
            if (activeFilters.includes("hasDiameter")) {
                filteredBodies = filteredBodies.filter(body => body.meanRadius && body.meanRadius > 0);
            }
            if (activeFilters.includes("hasMoons")) {
                filteredBodies = filteredBodies.filter(body => body.moons && body.moons.length > 0);
            }

            // Apply sorting
            if (sortCriteria === "mass") {
                filteredBodies.sort((a, b) => {
                    const massA = a.mass ? a.mass.massValue : -Infinity;
                    const massB = b.mass ? b.mass.massValue : -Infinity;
                    return massB - massA;  // Sort highest to lowest
                });
            } else if (sortCriteria === "density") {
                filteredBodies.sort((a, b) => (b.density || -Infinity) - (a.density || -Infinity));
            } else if (sortCriteria === "gravity") {
                filteredBodies.sort((a, b) => (b.gravity || -Infinity) - (a.gravity || -Infinity));
            } else if (sortCriteria === "diameter") {
                filteredBodies.sort((a, b) => (b.meanRadius || -Infinity) - (a.meanRadius || -Infinity));
            } else if (sortCriteria === "name") {
                filteredBodies.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortCriteria === "moons") {
                filteredBodies.sort((a, b) => {
                    const moonsA = a.moons ? a.moons.length : 0;
                    const moonsB = b.moons ? b.moons.length : 0;
                    return moonsB - moonsA;
                });
            }

            setDisplayedBodies(filteredBodies);
        }
    }, [data.bodies, sortCriteria, activeFilters]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://api.le-systeme-solaire.net/rest/bodies"
            );
            if (!response.ok) {
                throw new Error("Error al cargar los datos");
            } else {
                const jsonData = await response.json();
                setData(jsonData);
                setDisplayedBodies(jsonData.bodies || []);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (criteria) => {
        setSortCriteria(criteria);
    };

    const handleFilter = (filterType) => {
        if (activeFilters.includes(filterType)) {
            setActiveFilters(activeFilters.filter(filter => filter !== filterType));
        } else {
            // For planet filters, we need to ensure they don't conflict
            if (filterType === "isPlanet") {
                setActiveFilters([...activeFilters.filter(f => f !== "isNotPlanet"), filterType]);
            } else if (filterType === "isNotPlanet") {
                setActiveFilters([...activeFilters.filter(f => f !== "isPlanet"), filterType]);
            } else {
                setActiveFilters([...activeFilters, filterType]);
            }
        }
    };

    const handleOthersMenuOpen = (event) => {
        setOthersMenuAnchor(event.currentTarget);
    };

    const handleOthersMenuClose = () => {
        setOthersMenuAnchor(null);
    };

    const handleOtherFiltersMenuOpen = (event) => {
        setOtherFiltersMenuAnchor(event.currentTarget);
    };

    const handleOtherFiltersMenuClose = () => {
        setOtherFiltersMenuAnchor(null);
    };

    if (error) {
        return (
            <Box>
                <Typography>Ups!... An error has occurred</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4">Bodies</Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Order By:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button 
                            variant={sortCriteria === "mass" ? "contained" : "outlined"} 
                            onClick={() => handleSort("mass")}
                            color="primary"
                        >
                            Mass
                        </Button>
                        <Button 
                            variant={sortCriteria === "density" ? "contained" : "outlined"} 
                            onClick={() => handleSort("density")}
                            color="primary"
                        >
                            Density
                        </Button>
                        <Button 
                            variant={sortCriteria === "gravity" ? "contained" : "outlined"} 
                            onClick={() => handleSort("gravity")}
                            color="primary"
                        >
                            Gravity
                        </Button>
                        <Button 
                            variant={sortCriteria === "diameter" ? "contained" : "outlined"} 
                            onClick={() => handleSort("diameter")}
                            color="primary"
                        >
                            Diameter
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={handleOthersMenuOpen}
                            color="primary"
                        >
                            Others
                        </Button>
                        <Menu
                            anchorEl={othersMenuAnchor}
                            open={Boolean(othersMenuAnchor)}
                            onClose={handleOthersMenuClose}
                        >
                            <MenuItem onClick={() => {
                                handleSort("name");
                                handleOthersMenuClose();
                            }}>Name</MenuItem>
                            <MenuItem onClick={() => {
                                handleSort("moons");
                                handleOthersMenuClose();
                            }}>Number of Moons</MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Filter By:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 2 }}>
                        <Button 
                            variant={activeFilters.includes("isPlanet") ? "contained" : "outlined"} 
                            onClick={() => handleFilter("isPlanet")}
                            color="secondary"
                        >
                            Is a planet
                        </Button>
                        <Button 
                            variant={activeFilters.includes("isNotPlanet") ? "contained" : "outlined"} 
                            onClick={() => handleFilter("isNotPlanet")}
                            color="secondary"
                        >
                            Is not a planet
                        </Button>
                        <Button 
                            variant={activeFilters.includes("hasGravity") ? "contained" : "outlined"} 
                            onClick={() => handleFilter("hasGravity")}
                            color="secondary"
                        >
                            Has gravity
                        </Button>
                        <Button 
                            variant={activeFilters.includes("hasDiameter") ? "contained" : "outlined"} 
                            onClick={() => handleFilter("hasDiameter")}
                            color="secondary"
                        >
                            Has diameter
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={handleOtherFiltersMenuOpen}
                            color="secondary"
                        >
                            Others
                        </Button>
                        <Menu
                            anchorEl={otherFiltersMenuAnchor}
                            open={Boolean(otherFiltersMenuAnchor)}
                            onClose={handleOtherFiltersMenuClose}
                        >
                            <MenuItem onClick={() => {
                                handleFilter("hasMoons");
                                handleOtherFiltersMenuClose();
                            }}>
                                {activeFilters.includes("hasMoons") ? "✓ " : ""}Has Moons
                            </MenuItem>
                        </Menu>
                    </Box>
                    
                    {activeFilters.length > 0 && (
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: 2 }}>
                            <Typography variant="body2">Active Filters:</Typography>
                            {activeFilters.map(filter => (
                                <Button 
                                    key={filter}
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleFilter(filter)}
                                >
                                    {filter === "isPlanet" && "Is a planet"}
                                    {filter === "isNotPlanet" && "Is not a planet"}
                                    {filter === "hasGravity" && "Has gravity"}
                                    {filter === "hasDiameter" && "Has diameter"}
                                    {filter === "hasMoons" && "Has moons"}
                                    ✕
                                </Button>
                            ))}
                            <Button 
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => setActiveFilters([])}
                            >
                                Clear All
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
            
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
                    <Typography>Loading...</Typography>
                </Box>
            ) : (
                <Box>
                    <Typography variant="subtitle1" sx={{ padding: 2 }}>
                        Showing {displayedBodies.length} of {data.bodies?.length || 0} bodies
                    </Typography>
                    {displayedBodies.map((element) => {
                        const massValue = element.mass
                            ? element.mass.massValue
                            : "N/A";
                        return (
                            <Body
                                key={element.id}
                                id={element.id}
                                name={element.name}
                                density={element.density}
                                gravity={element.gravity}
                                mass={massValue}
                                isPlanet={element.isPlanet}
                                moons={element.moons ? element.moons.length : 0}
                            />
                        );
                    })}
                </Box>
            )}
        </>
    );
};